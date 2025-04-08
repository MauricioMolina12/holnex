import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/products.model';

// Upload all the products
export const loadProducts = createAction('[Products] Load Products');
export const loadProductsSuccess = createAction('[Products] Load Products Success', props<{ products: Product[] }>());
export const loadProductsFailure = createAction('[Products] Load Products Failure', props<{ error: string }>());

// Get a the product by Id
export const loadProductById = createAction('[Products] Load Product By ID', props<{ slug: string }>());
export const loadProductByIdSuccess = createAction('[Products] Load Product By ID Success', props<{ product: Product }>());
export const loadProductByIdFailure = createAction('[Products] Load Product By ID Failure', props<{ error: string }>());
