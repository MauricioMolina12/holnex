import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { FavoritesService } from '../services/favorites.service';
import {
  loadFavorites,
  loadFavoritesSuccess,
  loadFavoritesFailure,
  addToFavorites,
  addToFavoritesSuccess,
  addToFavoritesFailure,
  removeFromFavorites,
  removeFromFavoritesSuccess,
  removeFromFavoritesFailure,
} from './favorites.actions';

@Injectable()
export class FavoritesEffects {

  loadFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFavorites),
      switchMap(() =>
        this.favoritesService.getFavorites().pipe(
          map((favorites) => loadFavoritesSuccess({ favorites })),
          catchError((error) =>
            of(loadFavoritesFailure({ error: error.message || 'Error al cargar favoritos' }))
          )
        )
      )
    )
  );

  addToFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToFavorites),
      switchMap(({ productId, product }) =>
        this.favoritesService.addFavorite(productId, product).pipe(
          map((favorite) => addToFavoritesSuccess({ favorite })),
          catchError((error) =>
            of(addToFavoritesFailure({ error: error.message || 'Error al agregar a favoritos' }))
          )
        )
      )
    )
  );

  removeFromFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeFromFavorites),
      switchMap(({ productId }) =>
        this.favoritesService.removeFavorite(productId).pipe(
          map(() => removeFromFavoritesSuccess({ productId })),
          catchError((error) =>
            of(removeFromFavoritesFailure({ error: error.message || 'Error al eliminar de favoritos' }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private favoritesService: FavoritesService
  ) {}
}
