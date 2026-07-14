import { createReducer, on } from '@ngrx/store';
import { initialSearchState, initialSearchFilters } from '../models/search.model';
import {
  searchProducts,
  searchProductsSuccess,
  searchProductsFailure,
  setFilters,
  clearFilters,
  setSort,
  setPage,
} from './search.actions';

export const searchReducer = createReducer(
  initialSearchState,

  // ── Search ──
  on(searchProducts, (state, { query }) => ({
    ...state,
    query,
    page: 1,
    loading: true,
    error: null,
  })),
  on(searchProductsSuccess, (state, { response }) => ({
    ...state,
    products: response.products,
    meta: response.meta,
    availableCategories: response.availableCategories,
    loading: false,
    error: null,
  })),
  on(searchProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ── Filters ──
  on(setFilters, (state, { filters }) => ({
    ...state,
    filters: { ...state.filters, ...filters },
    page: 1,
    loading: true,
  })),
  on(clearFilters, (state) => ({
    ...state,
    filters: { ...initialSearchFilters },
    page: 1,
    loading: true,
  })),

  // ── Sort ──
  on(setSort, (state, { sort }) => ({
    ...state,
    sort,
    page: 1,
    loading: true,
  })),

  // ── Pagination ──
  on(setPage, (state, { page }) => ({
    ...state,
    page,
    loading: true,
  }))
);
