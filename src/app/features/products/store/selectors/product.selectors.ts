import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsListState, ProductDetailState } from '../../models/products.model';

export const selectProductState = createFeatureSelector<ProductsListState>('products');
export const selectProductDetailState = createFeatureSelector<ProductDetailState>('productDetail');

export const selectAllProducts = createSelector(selectProductState, (state) => state.products);
export const selectLoading = createSelector(selectProductState, (state) => state.loading);
export const selectError = createSelector(selectProductState, (state) => state.error);

export const selectProductDetail = createSelector(selectProductDetailState, (state) => state.product);
export const selectProductLoading = createSelector(selectProductDetailState, (state) => state.loading);
export const selectProductError = createSelector(selectProductDetailState, (state) => state.loading);
