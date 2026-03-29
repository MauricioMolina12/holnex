import { createAction, props } from '@ngrx/store';
import { AuthUser } from '../../shared/models/auth-user.model';

export const loadAuthUser = createAction('[User] Load Auth User');
export const loadAuthUserSuccess = createAction('[User] Load Auth User Success',props<{ user: AuthUser }>());
export const loadAuthUserFailure = createAction('[User] Load Auth User Failure',props<{ error: string }>()); 

export const setAuthUser = createAction('[User] Set Auth User',props<{ user: AuthUser }>());

export const updateAuthUser = createAction('[User] Update Auth User',props<{ user: Partial<AuthUser> }>());
export const updateAuthUserSuccess = createAction('[User] Update Auth User Success',props<{ user: AuthUser }>());
export const updateAuthUserFailure = createAction('[User] Update Auth User Failure',props<{ error: string }>());

export const clearAuthUser = createAction('[User] Clear Auth User');
