import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchState } from '../models/search.model';

export const selectSearchState = createFeatureSelector<SearchState>('search');

export const selectSearchQuery = createSelector(selectSearchState, (s) => s.query);
export const selectSearchProducts = createSelector(selectSearchState, (s) => s.products);
export const selectSearchLoading = createSelector(selectSearchState, (s) => s.loading);
export const selectSearchError = createSelector(selectSearchState, (s) => s.error);
export const selectSearchMeta = createSelector(selectSearchState, (s) => s.meta);
export const selectSearchFilters = createSelector(selectSearchState, (s) => s.filters);
export const selectSearchSort = createSelector(selectSearchState, (s) => s.sort);
export const selectSearchPage = createSelector(selectSearchState, (s) => s.page);
export const selectAvailableCategories = createSelector(selectSearchState, (s) => s.availableCategories);

export const selectTotalResults = createSelector(selectSearchMeta, (meta) => meta.totalResults);
export const selectTotalPages = createSelector(selectSearchMeta, (meta) => meta.totalPages);

export const selectActiveFilterCount = createSelector(selectSearchFilters, (f) => {
  let count = 0;
  if (f.categories.length) count += f.categories.length;
  if (f.priceMin !== null || f.priceMax !== null) count++;
  if (f.freeShipping) count++;
  if (f.rating !== null) count++;
  if (f.condition.length) count += f.condition.length;
  return count;
});

export const selectHasActiveFilters = createSelector(selectActiveFilterCount, (count) => count > 0);
