import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, of, switchMap, take } from 'rxjs';
import { selectAllStores, selectStoresLoaded } from '../store/my-stores.selectors';
import * as MyStoresActions from '../store/my-stores.actions';

/**
 * Guard that ensures the store identified by `:storeSlug` exists
 * in the user's list of stores. Redirects to `/my-stores` if not found.
 *
 * Also ensures stores are loaded before checking.
 */
export const storeExistsGuard: CanActivateFn = (route) => {
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) {
    return of(true);
  }

  const store = inject(Store);
  const router = inject(Router);
  const storeSlug = route.paramMap.get('storeSlug');

  return store.select(selectStoresLoaded).pipe(
    take(1),
    switchMap((loaded) => {
      if (!loaded) {
        store.dispatch(MyStoresActions.loadStores());
      }
      return store.select(selectStoresLoaded).pipe(
        filter((l) => l),
        take(1),
        switchMap(() => store.select(selectAllStores).pipe(take(1))),
        map((stores) => {
          const found = stores.find((s) => s.slug === storeSlug);
          return found ? true : router.createUrlTree(['/my-stores']);
        }),
      );
    }),
  );
};
