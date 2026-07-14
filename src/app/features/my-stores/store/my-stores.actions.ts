import { createAction, props } from '@ngrx/store';
import { Store, StoreProduct } from '../models/my-stores.model';

// ─── Stores ───────────────────────────────────────────────
export const loadStores = createAction('[MyStores] Load Stores');
export const loadStoresSuccess = createAction('[MyStores] Load Stores Success', props<{ stores: Store[] }>());
export const loadStoresFailure = createAction('[MyStores] Load Stores Failure', props<{ error: string }>());

export const selectStore = createAction('[MyStores] Select Store', props<{ storeId: string }>());
export const selectStoreSuccess = createAction('[MyStores] Select Store Success', props<{ store: Store }>());

// ─── Store Products ───────────────────────────────────────
export const loadStoreProducts = createAction('[MyStores] Load Store Products', props<{ storeId: string }>());
export const loadStoreProductsSuccess = createAction('[MyStores] Load Store Products Success', props<{ products: StoreProduct[]; totalCount: number }>());
export const loadStoreProductsFailure = createAction('[MyStores] Load Store Products Failure', props<{ error: string }>());

export const createStoreProduct = createAction('[MyStores] Create Store Product', props<{ storeId: string; product: Partial<StoreProduct> }>());
export const createStoreProductSuccess = createAction('[MyStores] Create Store Product Success', props<{ product: StoreProduct }>());
export const createStoreProductFailure = createAction('[MyStores] Create Store Product Failure', props<{ error: string }>());

export const updateStoreProduct = createAction('[MyStores] Update Store Product', props<{ storeId: string; productId: string; changes: Partial<StoreProduct> }>());
export const updateStoreProductSuccess = createAction('[MyStores] Update Store Product Success', props<{ product: StoreProduct }>());
export const updateStoreProductFailure = createAction('[MyStores] Update Store Product Failure', props<{ error: string }>());

export const deleteStoreProduct = createAction('[MyStores] Delete Store Product', props<{ storeId: string; productId: string }>());
export const deleteStoreProductSuccess = createAction('[MyStores] Delete Store Product Success', props<{ productId: string }>());
export const deleteStoreProductFailure = createAction('[MyStores] Delete Store Product Failure', props<{ error: string }>());
