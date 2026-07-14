import { createReducer, on } from '@ngrx/store';
import * as MyStoresActions from './my-stores.actions';
import { MyStoresState, StoreProductsState } from '../models/my-stores.model';

// ─── Stores Reducer ───────────────────────────────────────
const initialStoresState: MyStoresState = {
  stores: [],
  selectedStore: null,
  loading: false,
  loaded: false,
  error: null,
};

export const myStoresReducer = createReducer(
  initialStoresState,
  on(MyStoresActions.loadStores, (state) => ({ ...state, loading: true, error: null })),
  on(MyStoresActions.loadStoresSuccess, (state, { stores }) => ({
    ...state,
    stores,
    loading: false,
    loaded: true,
  })),
  on(MyStoresActions.loadStoresFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: true,
    error,
  })),
  on(MyStoresActions.selectStoreSuccess, (state, { store }) => ({
    ...state,
    selectedStore: store,
  })),
);

// ─── Store Products Reducer ───────────────────────────────
const initialProductsState: StoreProductsState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  totalCount: 0,
};

export const storeProductsReducer = createReducer(
  initialProductsState,
  on(MyStoresActions.loadStoreProducts, (state) => ({ ...state, loading: true, error: null })),
  on(MyStoresActions.loadStoreProductsSuccess, (state, { products, totalCount }) => ({
    ...state,
    products,
    totalCount,
    loading: false,
  })),
  on(MyStoresActions.loadStoreProductsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // Create
  on(MyStoresActions.createStoreProductSuccess, (state, { product }) => ({
    ...state,
    products: [product, ...state.products],
    totalCount: state.totalCount + 1,
  })),

  // Update
  on(MyStoresActions.updateStoreProductSuccess, (state, { product }) => ({
    ...state,
    products: state.products.map((p) => (p.id === product.id ? product : p)),
  })),

  // Delete
  on(MyStoresActions.deleteStoreProductSuccess, (state, { productId }) => ({
    ...state,
    products: state.products.filter((p) => p.id !== productId),
    totalCount: state.totalCount - 1,
  })),
);
