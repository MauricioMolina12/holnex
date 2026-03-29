import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProfileService } from '../services/profile.service';
import {
  loadOrders,
  loadOrdersFailure,
  loadOrdersSuccess,
  loadProfile,
  loadProfileFailure,
  loadProfileStats,
  loadProfileStatsFailure,
  loadProfileStatsSuccess,
  loadProfileSuccess,
  updateProfile,
  updateProfileFailure,
  updateProfileSuccess,
} from './profile.actions';
import { setAuthUser } from '../../../store/user/user.actions';

@Injectable()
export class ProfileEffects {

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProfile),
      mergeMap(() =>
        this.profileService.getProfile().pipe(
          mergeMap((user) => [
            loadProfileSuccess({ user }),
            setAuthUser({ user }),
          ]),
          catchError((error) => of(loadProfileFailure({ error: error.message || 'Failed to load profile' })))
        )
      )
    )
  );

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProfile),
      mergeMap(({ user }) =>
        this.profileService.updateProfile(user).pipe(
          mergeMap((updatedUser) => [
            updateProfileSuccess({ user: updatedUser }),
            setAuthUser({ user: updatedUser }),
          ]),
          catchError((error) => of(updateProfileFailure({ error: error.message || 'Failed to update profile' })))
        )
      )
    )
  );

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadOrders),
      mergeMap(() =>
        this.profileService.getOrders().pipe(
          map((orders) => loadOrdersSuccess({ orders })),
          catchError((error) => of(loadOrdersFailure({ error: error.message || 'Failed to load orders' })))
        )
      )
    )
  );

  loadProfileStats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProfileStats),
      mergeMap(() =>
        this.profileService.getStats().pipe(
          map((stats) => loadProfileStatsSuccess({ stats })),
          catchError((error) => of(loadProfileStatsFailure({ error: error.message || 'Failed to load stats' })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private profileService: ProfileService
  ) {}
}
