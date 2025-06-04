import { createReducer, on } from '@ngrx/store';
import * as ProductActions from '../actions/product.actions';
import { ProductState } from '../../models/products.model';

const initialState: ProductState = {
  products: [],
  productDetail: null,
  loading: false,
  error: null
};

export const productReducer = createReducer(
  initialState,

  // Cargar todos los productos
  on(ProductActions.loadProducts, (state) => ({ ...state, loading: true, error: null })),
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({ ...state, products, loading: false })),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({ ...state, error, loading: false })),

  // Cargar un producto por ID
  on(ProductActions.loadProductById, (state) => ({ ...state, loading: true, error: null })),
  on(ProductActions.loadProductByIdSuccess, (state, { product }) => ({ ...state, productDetail: product, loading: false })),
  on(ProductActions.loadProductByIdFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
