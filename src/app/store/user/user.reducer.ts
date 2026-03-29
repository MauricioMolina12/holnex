import { createReducer, on } from '@ngrx/store';
import { UserState } from '../../shared/models/auth-user.model';
import {
  clearAuthUser,
  loadAuthUser,
  loadAuthUserFailure,
  loadAuthUserSuccess,
  setAuthUser,
  updateAuthUser,
  updateAuthUserFailure,
  updateAuthUserSuccess,
} from './user.actions';

export const initialUserState: UserState = {
  user: null,
  loading: false,
  loaded: false,
  error: null,
};

export const userReducer = createReducer(
  initialUserState,

  on(loadAuthUser, (state) => ({ ...state, loading: true, error: null })),
  on(loadAuthUserSuccess, (state, { user }) => ({ ...state, loading: false, loaded: true, user })),
  on(loadAuthUserFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(setAuthUser, (state, { user }) => ({ ...state, user, loaded: true })),

  on(updateAuthUser, (state) => ({ ...state, loading: true, error: null })),
  on(updateAuthUserSuccess, (state, { user }) => ({ ...state, loading: false, user })),
  on(updateAuthUserFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(clearAuthUser, () => initialUserState),
);
