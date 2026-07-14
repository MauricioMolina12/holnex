import { createAction, props } from '@ngrx/store';
import { SearchFilters, SearchResponse, SortOption } from '../models/search.model';

// ── Search ──────────────────────────────────────────────
export const searchProducts        = createAction('[Search] Search Products',         props<{ query: string }>());
export const searchProductsSuccess = createAction('[Search] Search Products Success', props<{ response: SearchResponse }>());
export const searchProductsFailure = createAction('[Search] Search Products Failure', props<{ error: string }>());



// ── Filters ─────────────────────────────────────────────
export const setFilters            = createAction('[Search] Set Filters', props<{ filters: Partial<SearchFilters> }>());
export const clearFilters          = createAction('[Search] Clear Filters');


// ── Sort ────────────────────────────────────────────────
export const setSort               = createAction('[Search] Set Sort', props<{ sort: SortOption }>());

// ── Pagination ──────────────────────────────────────────
export const setPage               = createAction('[Search] Set Page', props<{ page: number }>());
