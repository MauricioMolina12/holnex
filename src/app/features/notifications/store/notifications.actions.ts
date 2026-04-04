import { createAction, props } from '@ngrx/store';
import { Notification } from '../models/notification.model';

// ── Load notifications ─────────────────────────────────────
export const loadNotifications = createAction('[Notifications] Load');
export const loadNotificationsSuccess = createAction('[Notifications] Load Success', props<{ notifications: Notification[] }>());
export const loadNotificationsFailure = createAction('[Notifications] Load Failure', props<{ error: string }>());

// ── Mark as read ───────────────────────────────────────────
export const markAsRead = createAction('[Notifications] Mark As Read',props<{ id: string }>());
export const markAsReadSuccess = createAction('[Notifications] Mark As Read Success',props<{ id: string }>());
export const markAsReadFailure = createAction('[Notifications] Mark As Read Failure',props<{ error: string }>());

// ── Mark all as read ───────────────────────────────────────
export const markAllAsRead = createAction('[Notifications] Mark All As Read');
export const markAllAsReadSuccess = createAction('[Notifications] Mark All As Read Success');
export const markAllAsReadFailure = createAction('[Notifications] Mark All As Read Failure',props<{ error: string }>());

// ── Filter ─────────────────────────────────────────────────
export const setFilter = createAction('[Notifications] Set Filter', props<{ filter: 'all' | 'unread' }>());
