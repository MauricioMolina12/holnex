import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProfileService } from '../../features/profile/services/profile.service';
import { AUTH_PROVIDER, AuthProvider } from '../../core/auth/auth-provider';
import { HttpService } from '../../core/services/http.service';
import {
  checkSession,
  checkSessionFailure,
  checkSessionNoSession,
  checkSessionSuccess,
  loadAuthUser,
  loadAuthUserFailure,
  loadAuthUserSuccess,
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutSuccess,
  updateAuthUser,
  updateAuthUserFailure,
  updateAuthUserSuccess,
} from './user.actions';

@Injectable()
export class UserEffects {

  // ── Session check (runs on app init) ──
  checkSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkSession),
      switchMap(() =>
        this.authProvider.checkSession().pipe(
          map((result) =>
            result
              ? checkSessionSuccess({ user: result.user, token: result.token })
              : checkSessionNoSession()
          ),
          catchError((error) =>
            of(checkSessionFailure({ error: error.message || 'Session check failed' }))
          )
        )
      )
    )
  );

  // ── Persist token on session restore ──
  checkSessionSetToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkSessionSuccess),
      tap(({ token }) => { HttpService.idtoken = token; })
    ),
    { dispatch: false }
  );

  // ── Login ──
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ credentials }) =>
        this.authProvider.login(credentials).pipe(
          tap(({ token }) => { HttpService.idtoken = token; }),
          map(({ user, token }) => loginSuccess({ user, token })),
          catchError((error) =>
            of(loginFailure({ error: error.message || 'Login failed' }))
          )
        )
      )
    )
  );

  // ── Logout ──
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      switchMap(() =>
        this.authProvider.logout().pipe(
          tap(() => { HttpService.idtoken = ''; }),
          map(() => logoutSuccess())
        )
      )
    )
  );

  // ── Load user profile ──
  loadAuthUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAuthUser),
      mergeMap(() =>
        this.profileService.getProfile().pipe(
          map((user) => loadAuthUserSuccess({ user })),
          catchError((error) =>
            of(loadAuthUserFailure({ error: error.message || 'Failed to load user' }))
          )
        )
      )
    )
  );

  // ── Update user profile ──
  updateAuthUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAuthUser),
      mergeMap(({ user }) =>
        this.profileService.updateProfile(user).pipe(
          map((updatedUser) => updateAuthUserSuccess({ user: updatedUser })),
          catchError((error) =>
            of(updateAuthUserFailure({ error: error.message || 'Failed to update user' }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    @Inject(AUTH_PROVIDER) private authProvider: AuthProvider
  ) {}
}
