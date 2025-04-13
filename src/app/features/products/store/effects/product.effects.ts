import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as ProductActions from '../actions/product.actions';
import { environment } from '../../../../../environments/environment';
import { Product } from '../../models/products.model';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  // Load all the products
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.http.get<Product[]>(`${environment.api}/products`).pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) => of(ProductActions.loadProductsFailure({ error: error.message })))
        )
      )
    )
  );

  // Load product by Id
  loadProductById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductById),
      mergeMap(({ slug }) =>
        this.http.get<Product>(`${environment.api}/products/slug/${slug}`).pipe(
          map((product) => ProductActions.loadProductByIdSuccess({ product })),
          catchError((error) => of(ProductActions.loadProductByIdFailure({ error: error.message })))
        )
      )
    )
  );
}
