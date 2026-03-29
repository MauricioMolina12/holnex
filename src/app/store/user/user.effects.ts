import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProfileService } from '../../features/profile/services/profile.service';
import {
  loadAuthUser,
  loadAuthUserFailure,
  loadAuthUserSuccess,
  updateAuthUser,
  updateAuthUserFailure,
  updateAuthUserSuccess,
} from './user.actions';

@Injectable()
export class UserEffects {

  loadAuthUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAuthUser),
      mergeMap(() =>
        this.profileService.getProfile().pipe(
          map((user) => loadAuthUserSuccess({ user })),
          catchError((error) => of(loadAuthUserFailure({ error: error.message || 'Failed to load user' })))
        )
      )
    )
  );

  updateAuthUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAuthUser),
      mergeMap(({ user }) =>
        this.profileService.updateProfile(user).pipe(
          map((updatedUser) => updateAuthUserSuccess({ user: updatedUser })),
          catchError((error) => of(updateAuthUserFailure({ error: error.message || 'Failed to update user' })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private profileService: ProfileService
  ) {}
}
