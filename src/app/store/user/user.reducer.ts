import { createReducer, on } from '@ngrx/store';
import { UserState } from '../../shared/models/auth-user.model';
import {
  checkSession,
  checkSessionFailure,
  checkSessionNoSession,
  checkSessionSuccess,
  clearAuthUser,
  loadAuthUser,
  loadAuthUserFailure,
  loadAuthUserSuccess,
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutSuccess,
  setAuthUser,
  updateAuthUser,
  updateAuthUserFailure,
  updateAuthUserSuccess,
} from './user.actions';

export const initialUserState: UserState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  loaded: false,
  error: null,
};

export const userReducer = createReducer(
  initialUserState,

  // ── Session check ──
  on(checkSession, (state) => ({ ...state, loading: true, error: null })),
  on(checkSessionSuccess, (state, { user }) => ({
    ...state, user, isAuthenticated: true, loading: false, loaded: true, error: null,
  })),
  on(checkSessionNoSession, (state) => ({
    ...state, loading: false, loaded: true, isAuthenticated: false,
  })),
  on(checkSessionFailure, (state, { error }) => ({
    ...state, loading: false, loaded: true, error,
  })),

  // ── Login ──
  on(login, (state) => ({ ...state, loading: true, error: null })),
  on(loginSuccess, (state, { user }) => ({
    ...state, user, isAuthenticated: true, loading: false, loaded: true, error: null,
  })),
  on(loginFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // ── Logout ──
  on(logout, (state) => ({ ...state, loading: true })),
  on(logoutSuccess, () => ({ ...initialUserState, loaded: true })),

  // ── Load user (profile fetch) ──
  on(loadAuthUser, (state) => ({ ...state, loading: true, error: null })),
  on(loadAuthUserSuccess, (state, { user }) => ({ ...state, loading: false, loaded: true, user })),
  on(loadAuthUserFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(setAuthUser, (state, { user }) => ({ ...state, user, loaded: true })),

  // ── Update user ──
  on(updateAuthUser, (state) => ({ ...state, loading: true, error: null })),
  on(updateAuthUserSuccess, (state, { user }) => ({ ...state, loading: false, user })),
  on(updateAuthUserFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // ── Clear ──
  on(clearAuthUser, () => initialUserState),
);
