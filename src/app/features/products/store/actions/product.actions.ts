import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/products.model';

// Upload all the products
export const loadProducts = createAction('[Products] Load Products');
export const loadProductsSuccess = createAction('[Products] Load Products Success', props<{ products: Product[] }>());
export const loadProductsFailure = createAction('[Products] Load Products Failure', props<{ error: string }>());

// Get a the product by Slug
export const loadProductBySlug = createAction('[Products] Load Product By Slug', props<{ slug: string }>());
export const loadProductBySlugSuccess = createAction('[Products] Load Product By Slug Success', props<{ product: Product }>());
export const loadProductBySlugFailure = createAction('[Products] Load Product By Slug Failure', props<{ error: string }>());
