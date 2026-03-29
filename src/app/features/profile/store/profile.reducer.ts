import { createReducer, on } from '@ngrx/store';
import { ProfileState } from '../models/profile.model';
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

export const initialState: ProfileState = {
  orders: [],
  stats: null,
  loading: false,
  error: null,
  updating: false,
  ordersLoaded: false,
  statsLoaded: false,
};

export const profileReducer = createReducer(
  initialState,

  // Load Profile
  on(loadProfile, (state) => ({ ...state, loading: true, error: null })),
  on(loadProfileSuccess, (state) => ({ ...state, loading: false })),
  on(loadProfileFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Update Profile
  on(updateProfile, (state) => ({ ...state, updating: true, error: null })),
  on(updateProfileSuccess, (state) => ({ ...state, updating: false })),
  on(updateProfileFailure, (state, { error }) => ({ ...state, updating: false, error })),

  // Load Orders
  on(loadOrders, (state) => ({ ...state, loading: true, error: null })),
  on(loadOrdersSuccess, (state, { orders }) => ({ ...state, loading: false, orders, ordersLoaded: true })),
  on(loadOrdersFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Load Profile Stats
  on(loadProfileStats, (state) => ({ ...state, loading: true, error: null })),
  on(loadProfileStatsSuccess, (state, { stats }) => ({ ...state, loading: false, stats, statsLoaded: true })),
  on(loadProfileStatsFailure, (state, { error }) => ({ ...state, loading: false, error })),
);
