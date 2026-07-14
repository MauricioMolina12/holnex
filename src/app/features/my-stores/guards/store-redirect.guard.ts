import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, take, switchMap, of } from 'rxjs';
import { selectAllStores, selectStoresLoaded } from '../store/my-stores.selectors';
import * as MyStoresActions from '../store/my-stores.actions';

/**
 * Guard for the `/my-stores` root path.
 *
 * - If the user has exactly 1 store → redirect to `/my-stores/:slug`
 * - If the user has 0 or 2+ stores → allow access to the store-selector page
 *
 * It also dispatches `loadStores` if stores haven't been loaded yet.
 */
export const storeRedirectGuard: CanActivateFn = () => {
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) {
    return of(true);
  }

  const store = inject(Store);
  const router = inject(Router);

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
          if (stores.length === 1) {
            return router.createUrlTree(['/my-stores', stores[0].slug]);
          }
          // 0 stores or multiple stores → show selector
          return true;
        }),
      );
    }),
  );
};
