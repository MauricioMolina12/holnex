import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState } from '../models/profile.model';
import { selectAuthUser, selectAuthLoaded, selectAuthLoading } from '../../../store/user/user.selectors';

export const selectProfileState = createFeatureSelector<ProfileState>('profile');

/** User comes from the global user store */
export const selectProfileUser = selectAuthUser;

export const selectProfileOrders = createSelector(
  selectProfileState,
  (state) => state.orders
);

export const selectProfileStats = createSelector(
  selectProfileState,
  (state) => state.stats
);

export const selectProfileLoading = createSelector(
  selectProfileState,
  (state) => state.loading
);

export const selectProfileError = createSelector(
  selectProfileState,
  (state) => state.error
);

export const selectProfileUpdating = createSelector(
  selectProfileState,
  (state) => state.updating
);

/** Delegates to global user store */
export const selectUserLoaded = selectAuthLoaded;

export const selectOrdersLoaded = createSelector(
  selectProfileState,
  (state) => state.ordersLoaded
);

export const selectStatsLoaded = createSelector(
  selectProfileState,
  (state) => state.statsLoaded
);
