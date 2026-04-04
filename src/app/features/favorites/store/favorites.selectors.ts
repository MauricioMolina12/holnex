import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsFavoriteState } from '../models/favorites.model';
import { Product } from '../../products/models/products.model';

export const selectFavoritesState =
  createFeatureSelector<ProductsFavoriteState>('favorites');

export const selectFavoriteIds = createSelector(
  selectFavoritesState,
  (state) => state.ids
);

export const selectFavoriteEntities = createSelector(
  selectFavoritesState,
  (state) => state.entities
);

export const selectAllFavorites = createSelector(
  selectFavoriteIds,
  selectFavoriteEntities,
  (ids, entities) => ids.map((id) => entities[id])
);

export const selectFavoriteProducts = createSelector(
  selectAllFavorites,
  (favorites) =>
    favorites
      .filter((f) => !!f?.product)
      .map((f) => f.product as Product)
);

export const selectFavoritesCount = createSelector(
  selectFavoriteIds,
  (ids) => ids.length
);

export const selectIsFavorite = (productId: string) =>
  createSelector(selectFavoriteIds, (ids) => ids.includes(productId));

export const selectFavoritesLoading = createSelector(
  selectFavoritesState,
  (state) => state.loading
);

export const selectFavoritesError = createSelector(
  selectFavoritesState,
  (state) => state.error
);
