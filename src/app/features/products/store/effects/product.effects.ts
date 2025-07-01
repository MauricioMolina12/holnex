import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as ProductActions from '../actions/product.actions';
import { environment } from '../../../../../environments/environment';
import { Product } from '../../models/products.model';
import { ProductsService } from '../../services/products.service';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private http: HttpClient, private productsService: ProductsService) {}

  // Load all the products
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.productsService.getAllProducts().pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) => of(ProductActions.loadProductsFailure({ error: error.message })))
        )
      )
    )
  );

  // Load product by Slug
  loadProductBySlug$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductBySlug),
      mergeMap(({ slug }) =>
        this.productsService.getProductBySlug(slug).pipe(
          map((product) => ProductActions.loadProductBySlugSuccess({ product })),
          catchError((error) => of(ProductActions.loadProductBySlugFailure({ error: error.message })))
        )
      )
    )
  );
}
