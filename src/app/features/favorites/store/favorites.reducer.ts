import { createReducer, on } from '@ngrx/store';
import { ProductsFavoriteState } from '../models/favorites.model';
import {
  loadFavorites,
  loadFavoritesSuccess,
  loadFavoritesFailure,
  addToFavoritesSuccess,
  addToFavoritesFailure,
  removeFromFavoritesSuccess,
  removeFromFavoritesFailure,
} from './favorites.actions';

export const initialFavoritesState: ProductsFavoriteState = {
  ids: [],
  entities: {},
  loading: false,
  error: null,
};

export const favoritesReducer = createReducer(
  initialFavoritesState,

  // ── Load ──
  on(loadFavorites, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadFavoritesSuccess, (state, { favorites }) => {
    const ids = favorites.map((f) => f.productId);
    const entities = favorites.reduce(
      (acc, f) => ({ ...acc, [f.productId]: f }),
      {} as Record<string, any>
    );
    return { ...state, ids, entities, loading: false, error: null };
  }),
  on(loadFavoritesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ── Add ──
  on(addToFavoritesSuccess, (state, { favorite }) => ({
    ...state,
    ids: [...state.ids, favorite.productId],
    entities: { ...state.entities, [favorite.productId]: favorite },
    error: null,
  })),
  on(addToFavoritesFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // ── Remove ──
  on(removeFromFavoritesSuccess, (state, { productId }) => {
    const { [productId]: _, ...entities } = state.entities;
    return {
      ...state,
      ids: state.ids.filter((id) => id !== productId),
      entities,
      error: null,
    };
  }),
  on(removeFromFavoritesFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
