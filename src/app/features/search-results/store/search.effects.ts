import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { SearchService } from '../services/search.service';
import { selectSearchState } from './search.selectors';
import {
  searchProducts,
  searchProductsSuccess,
  searchProductsFailure,
  setFilters,
  clearFilters,
  setSort,
  setPage,
} from './search.actions';

@Injectable()
export class SearchEffects {
  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchProducts, setFilters, clearFilters, setSort, setPage),
      withLatestFrom(this.store.select(selectSearchState)),
      switchMap(([_, state]) =>
        this.searchService
          .search({
            query: state.query,
            filters: state.filters,
            sort: state.sort,
            page: state.page,
            pageSize: state.pageSize,
          })
          .pipe(
            map((response) => searchProductsSuccess({ response })),
            catchError((error) =>
              of(
                searchProductsFailure({
                  error: error.message || 'Error al buscar productos',
                }),
              ),
            ),
          ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private searchService: SearchService,
  ) {}
}
