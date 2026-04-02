import { createAction, props } from '@ngrx/store';
import { AuthUser } from '../../shared/models/auth-user.model';
import { AuthCredentials } from '../../core/auth/auth-provider';

// ── Session check (app init) ──────────────────────────────────
export const checkSession = createAction('[Auth] Check Session');
export const checkSessionSuccess = createAction('[Auth] Check Session Success', props<{ user: AuthUser; token: string }>());
export const checkSessionNoSession = createAction('[Auth] Check Session No Session');
export const checkSessionFailure = createAction('[Auth] Check Session Failure', props<{ error: string }>());

// ── Login ─────────────────────────────────────────────────────
export const login = createAction('[Auth] Login', props<{ credentials: AuthCredentials }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: AuthUser; token: string }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

// ── Logout ────────────────────────────────────────────────────
export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');

// ── Load / update user (profile) ──────────────────────────────
export const loadAuthUser = createAction('[User] Load Auth User');
export const loadAuthUserSuccess = createAction('[User] Load Auth User Success', props<{ user: AuthUser }>());
export const loadAuthUserFailure = createAction('[User] Load Auth User Failure', props<{ error: string }>());

export const setAuthUser = createAction('[User] Set Auth User', props<{ user: AuthUser }>());

export const updateAuthUser = createAction('[User] Update Auth User', props<{ user: Partial<AuthUser> }>());
export const updateAuthUserSuccess = createAction('[User] Update Auth User Success', props<{ user: AuthUser }>());
export const updateAuthUserFailure = createAction('[User] Update Auth User Failure', props<{ error: string }>());

export const clearAuthUser = createAction('[User] Clear Auth User');
