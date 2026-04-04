import { Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { Favorite } from '../models/favorites.model';
import { Product } from '../../products/models/products.model';
import {
  loadFavorites,
  addToFavorites,
  removeFromFavorites,
} from '../store/favorites.actions';
import {
  selectAllFavorites,
  selectFavoriteIds,
  selectFavoriteProducts,
  selectFavoritesCount,
  selectIsFavorite,
  selectFavoritesLoading,
  selectFavoritesError,
} from '../store/favorites.selectors';

/**
 * Facade that centralizes all favorites interactions.
 *
 * - Exposes **signals** for template binding (no async pipe needed).
 * - Delegates to NgRx store — components never dispatch actions directly.
 */
@Injectable({ providedIn: 'root' })
export class FavoritesFacade {

  readonly favorites: Signal<Favorite[]>;
  readonly favoriteIds: Signal<string[]>;
  readonly products: Signal<Product[]>;
  readonly count: Signal<number>;
  readonly loading: Signal<boolean>;
  readonly error: Signal<string | null>;

  constructor(private store: Store) {
    this.favorites   = toSignal(this.store.select(selectAllFavorites),     { initialValue: [] });
    this.favoriteIds = toSignal(this.store.select(selectFavoriteIds),      { initialValue: [] });
    this.products    = toSignal(this.store.select(selectFavoriteProducts), { initialValue: [] });
    this.count       = toSignal(this.store.select(selectFavoritesCount),   { initialValue: 0 });
    this.loading     = toSignal(this.store.select(selectFavoritesLoading), { initialValue: false });
    this.error       = toSignal(this.store.select(selectFavoritesError),   { initialValue: null });
  }

  load(): void {
    this.store.dispatch(loadFavorites());
  }

  add(productId: string, product?: Product): void {
    this.store.dispatch(addToFavorites({ productId, product }));
  }

  remove(productId: string): void {
    this.store.dispatch(removeFromFavorites({ productId }));
  }

  toggle(productId: string, product?: Product): void {
    if (this.favoriteIds().includes(productId)) {
      this.remove(productId);
    } else {
      this.add(productId, product);
    }
  }

  isFavorite(productId: string): boolean {
    return this.favoriteIds().includes(productId);
  }
}
