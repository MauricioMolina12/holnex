import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from '../../models/products.model';

export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(selectProductState, (state) => state.products);
export const selectProductDetail = createSelector(selectProductState, (state) => state.productDetail);
export const selectLoading = createSelector(selectProductState, (state) => state.loading);
export const selectError = createSelector(selectProductState, (state) => state.error);

