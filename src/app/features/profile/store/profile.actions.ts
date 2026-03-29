import { createAction, props } from '@ngrx/store';
import { AuthUser } from '../../../shared/models/auth-user.model';
import { Order, ProfileStats } from '../models/profile.model';

// Load Profile
export const loadProfile = createAction('[Profile] Load Profile');
export const loadProfileSuccess = createAction(
  '[Profile] Load Profile Success',
  props<{ user: AuthUser }>()
);
export const loadProfileFailure = createAction(
  '[Profile] Load Profile Failure',
  props<{ error: string }>()
);

// Update Profile
export const updateProfile = createAction(
  '[Profile] Update Profile',
  props<{ user: Partial<AuthUser> }>()
);
export const updateProfileSuccess = createAction(
  '[Profile] Update Profile Success',
  props<{ user: AuthUser }>()
);
export const updateProfileFailure = createAction(
  '[Profile] Update Profile Failure',
  props<{ error: string }>()
);

// Load Orders
export const loadOrders = createAction('[Profile] Load Orders');
export const loadOrdersSuccess = createAction(
  '[Profile] Load Orders Success',
  props<{ orders: Order[] }>()
);
export const loadOrdersFailure = createAction(
  '[Profile] Load Orders Failure',
  props<{ error: string }>()
);

// Load Profile Stats
export const loadProfileStats = createAction('[Profile] Load Profile Stats');
export const loadProfileStatsSuccess = createAction(
  '[Profile] Load Profile Stats Success',
  props<{ stats: ProfileStats }>()
);
export const loadProfileStatsFailure = createAction(
  '[Profile] Load Profile Stats Failure',
  props<{ error: string }>()
);
