import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, take } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';
import { selectAuthLoaded, selectAuthUser, selectIsAuthenticated } from '../../store/user/user.selectors';

/**
 * Route guard that only allows access to users with `role === 'seller'`.
 * Waits for the session check to complete, then checks authentication + role.
 * On SSR, redirects to login immediately since auth session is browser-only.
 */
export const sellerGuard: CanActivateFn = () => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  if (!isPlatformBrowser(platformId)) {
    return of(true);
  }

  const store = inject(Store);

  return combineLatest([
    store.select(selectAuthLoaded),
    store.select(selectIsAuthenticated),
    store.select(selectAuthUser),
  ]).pipe(
    filter(([loaded]) => loaded),
    take(1),
    map(([, authenticated, user]) => {
      if (!authenticated) {
        return router.createUrlTree(['/user/login']);
      }
      if (user?.role !== 'seller' && user?.role !== 'admin') {
        return router.createUrlTree(['/']);
      }
      return true;
    })
  );
};
