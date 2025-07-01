import { createReducer, on } from '@ngrx/store';
import * as ProductActions from '../actions/product.actions';
import { ProductsListState, ProductDetailState } from '../../models/products.model';

const initialProductsState: ProductsListState = {
  products: [],
  loading: false,
  error: null
};

const initialDetailState: ProductDetailState = {
  product: null,
  loading: false,
  error: null
}

export const productsAllReducer = createReducer(
  initialProductsState,
  // Load all products
  on(ProductActions.loadProducts, (state) => ({ ...state, loading: true, error: null })),
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({ ...state, products, loading: false })),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({ ...state, error, loading: false })),
);

export const productDetailReducer = createReducer(
  initialDetailState,
  // Load product by ID
  on(ProductActions.loadProductBySlug, (state) => ({ ...state, loading: true, error: null })),
  on(ProductActions.loadProductBySlugSuccess, (state, { product }) => ({ ...state, product, loading: false })),
  on(ProductActions.loadProductBySlugFailure, (state, { error }) => ({ ...state, error, loading: false })),
);