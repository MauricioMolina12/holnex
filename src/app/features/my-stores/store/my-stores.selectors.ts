import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MyStoresState, StoreProductsState } from '../models/my-stores.model';

// ─── Stores ───────────────────────────────────────────────
export const selectMyStoresState = createFeatureSelector<MyStoresState>('myStores');

export const selectAllStores = createSelector(selectMyStoresState, (state) => state.stores);
export const selectSelectedStore = createSelector(selectMyStoresState, (state) => state.selectedStore);
export const selectStoresLoading = createSelector(selectMyStoresState, (state) => state.loading);
export const selectStoresLoaded = createSelector(selectMyStoresState, (state) => state.loaded);
export const selectStoresError = createSelector(selectMyStoresState, (state) => state.error);

export const selectStoreCount = createSelector(selectAllStores, (stores) => stores.length);
export const selectHasMultipleStores = createSelector(selectStoreCount, (count) => count > 1);
export const selectDefaultStore = createSelector(selectAllStores, (stores) => stores.find((s) => s.isDefault) ?? stores[0] ?? null);

// ─── Store Products ───────────────────────────────────────
export const selectStoreProductsState = createFeatureSelector<StoreProductsState>('storeProducts');

export const selectStoreProducts = createSelector(selectStoreProductsState, (state) => state.products);
export const selectStoreProductsLoading = createSelector(selectStoreProductsState, (state) => state.loading);
export const selectStoreProductsError = createSelector(selectStoreProductsState, (state) => state.error);
export const selectStoreProductsTotalCount = createSelector(selectStoreProductsState, (state) => state.totalCount);
