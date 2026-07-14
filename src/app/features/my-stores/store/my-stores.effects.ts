import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, withLatestFrom } from 'rxjs';
import * as MyStoresActions from './my-stores.actions';
import { selectAllStores } from './my-stores.selectors';
import { MyStoresService } from '../services/my-stores.service';

@Injectable()
export class MyStoresEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private myStoresService: MyStoresService,
  ) {}

  loadStores$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MyStoresActions.loadStores),
      mergeMap(() =>
        this.myStoresService.getStores().pipe(
          map((stores) => MyStoresActions.loadStoresSuccess({ stores })),
          catchError((error) => of(MyStoresActions.loadStoresFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  selectStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MyStoresActions.selectStore),
      withLatestFrom(this.store.select(selectAllStores)),
      map(([{ storeId }, stores]) => {
        const store = stores.find((s) => s.id === storeId);
        return store
          ? MyStoresActions.selectStoreSuccess({ store })
          : MyStoresActions.loadStoresFailure({ error: 'Store not found' });
      }),
    ),
  );

  // ─── Store Products ───────────────────────────────────────

  loadStoreProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MyStoresActions.loadStoreProducts),
      mergeMap(({ storeId }) =>
        this.myStoresService.getStoreProducts(storeId).pipe(
          map((res) => MyStoresActions.loadStoreProductsSuccess({ products: res.products, totalCount: res.totalCount })),
          catchError((error) => of(MyStoresActions.loadStoreProductsFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  createStoreProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MyStoresActions.createStoreProduct),
      mergeMap(({ storeId, product }) =>
        this.myStoresService.createProduct(storeId, product).pipe(
          map((created) => MyStoresActions.createStoreProductSuccess({ product: created })),
          catchError((error) => of(MyStoresActions.createStoreProductFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  updateStoreProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MyStoresActions.updateStoreProduct),
      mergeMap(({ storeId, productId, changes }) =>
        this.myStoresService.updateProduct(storeId, productId, changes).pipe(
          map((updated) => MyStoresActions.updateStoreProductSuccess({ product: updated })),
          catchError((error) => of(MyStoresActions.updateStoreProductFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  deleteStoreProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MyStoresActions.deleteStoreProduct),
      mergeMap(({ storeId, productId }) =>
        this.myStoresService.deleteProduct(storeId, productId).pipe(
          map(() => MyStoresActions.deleteStoreProductSuccess({ productId })),
          catchError((error) => of(MyStoresActions.deleteStoreProductFailure({ error: error.message }))),
        ),
      ),
    ),
  );
}
