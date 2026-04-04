import { Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../../products/models/products.model';
import { SearchFilters, SearchResultMeta, SortOption } from '../models/search.model';
import {
  searchProducts,
  setFilters,
  clearFilters,
  setSort,
  setPage,
} from '../store/search.actions';
import {
  selectSearchQuery,
  selectSearchProducts,
  selectSearchLoading,
  selectSearchError,
  selectSearchMeta,
  selectSearchFilters,
  selectSearchSort,
  selectSearchPage,
  selectAvailableCategories,
  selectTotalResults,
  selectTotalPages,
  selectActiveFilterCount,
  selectHasActiveFilters,
} from '../store/search.selectors';

@Injectable({ providedIn: 'root' })
export class SearchFacade {

  readonly query: Signal<string>;
  readonly products: Signal<Product[]>;
  readonly loading: Signal<boolean>;
  readonly error: Signal<string | null>;
  readonly meta: Signal<SearchResultMeta>;
  readonly filters: Signal<SearchFilters>;
  readonly sort: Signal<SortOption>;
  readonly page: Signal<number>;
  readonly availableCategories: Signal<{ name: string; count: number }[]>;
  readonly totalResults: Signal<number>;
  readonly totalPages: Signal<number>;
  readonly activeFilterCount: Signal<number>;
  readonly hasActiveFilters: Signal<boolean>;

  constructor(private store: Store) {
    this.query               = toSignal(this.store.select(selectSearchQuery),              { initialValue: '' });
    this.products            = toSignal(this.store.select(selectSearchProducts),           { initialValue: [] });
    this.loading             = toSignal(this.store.select(selectSearchLoading),            { initialValue: false });
    this.error               = toSignal(this.store.select(selectSearchError),              { initialValue: null });
    this.meta                = toSignal(this.store.select(selectSearchMeta),               { initialValue: { totalResults: 0, totalPages: 0, currentPage: 1, pageSize: 20 } });
    this.filters             = toSignal(this.store.select(selectSearchFilters),            { initialValue: { categories: [], priceMin: null, priceMax: null, freeShipping: false, rating: null, condition: [] } });
    this.sort                = toSignal(this.store.select(selectSearchSort),               { initialValue: 'relevance' as SortOption });
    this.page                = toSignal(this.store.select(selectSearchPage),               { initialValue: 1 });
    this.availableCategories = toSignal(this.store.select(selectAvailableCategories),      { initialValue: [] });
    this.totalResults        = toSignal(this.store.select(selectTotalResults),             { initialValue: 0 });
    this.totalPages          = toSignal(this.store.select(selectTotalPages),               { initialValue: 0 });
    this.activeFilterCount   = toSignal(this.store.select(selectActiveFilterCount),        { initialValue: 0 });
    this.hasActiveFilters    = toSignal(this.store.select(selectHasActiveFilters),         { initialValue: false });
  }

  search(query: string): void {
    this.store.dispatch(searchProducts({ query }));
  }

  updateFilters(filters: Partial<SearchFilters>): void {
    this.store.dispatch(setFilters({ filters }));
  }

  clearAllFilters(): void {
    this.store.dispatch(clearFilters());
  }

  changeSort(sort: SortOption): void {
    this.store.dispatch(setSort({ sort }));
  }

  changePage(page: number): void {
    this.store.dispatch(setPage({ page }));
  }

  toggleCategory(category: string): void {
    const current = this.filters().categories;
    const categories = current.includes(category)
      ? current.filter((c) => c !== category)
      : [...current, category];
    this.updateFilters({ categories });
  }

  toggleCondition(condition: string): void {
    const current = this.filters().condition;
    const updated = current.includes(condition)
      ? current.filter((c) => c !== condition)
      : [...current, condition];
    this.updateFilters({ condition: updated });
  }

  setPriceRange(min: number | null, max: number | null): void {
    this.updateFilters({ priceMin: min, priceMax: max });
  }

  toggleFreeShipping(): void {
    this.updateFilters({ freeShipping: !this.filters().freeShipping });
  }
}
