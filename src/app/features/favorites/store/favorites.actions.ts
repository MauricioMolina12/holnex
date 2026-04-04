import { createAction, props } from '@ngrx/store';
import { Favorite } from '../models/favorites.model';
import { Product } from '../../products/models/products.model';

// ── Load favorites ─────────────────────────────────────
export const loadFavorites = createAction('[Favorites] Load');
export const loadFavoritesSuccess = createAction('[Favorites] Load Success', props<{ favorites: Favorite[] }>());
export const loadFavoritesFailure = createAction('[Favorites] Load Failure', props<{ error: string }>());

// ── Add to favorites ───────────────────────────────────
export const addToFavorites = createAction('[Favorites] Add', props<{ productId: string; product?: Product }>());
export const addToFavoritesSuccess = createAction('[Favorites] Add Success', props<{ favorite: Favorite }>());
export const addToFavoritesFailure = createAction('[Favorites] Add Failure', props<{ error: string }>());

// ── Remove from favorites ───────────────────────────────
export const removeFromFavorites = createAction('[Favorites] Remove', props<{ productId: string }>());
export const removeFromFavoritesSuccess = createAction('[Favorites] Remove Success', props<{ productId: string }>());
export const removeFromFavoritesFailure = createAction('[Favorites] Remove Failure', props<{ error: string }>());

