import { createReducer, on } from '@ngrx/store';
import { NotificationsState } from '../models/notification.model';
import {
  loadNotifications,
  loadNotificationsSuccess,
  loadNotificationsFailure,
  markAsReadSuccess,
  markAllAsReadSuccess,
  setFilter,
} from './notifications.actions';

export const initialNotificationsState: NotificationsState = {
  notifications: [],
  loading: false,
  loaded: false,
  error: null,
  filter: 'all',
};

export const notificationsReducer = createReducer(
  initialNotificationsState,

  // ── Load ──
  on(loadNotifications, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadNotificationsSuccess, (state, { notifications }) => ({
    ...state,
    notifications,
    loading: false,
    loaded: true,
    error: null,
  })),
  
  on(loadNotificationsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ── Mark as read ──
  on(markAsReadSuccess, (state, { id }) => ({
    ...state,
    notifications: state.notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    ),
  })),

  // ── Mark all as read ──
  on(markAllAsReadSuccess, (state) => ({
    ...state,
    notifications: state.notifications.map((n) => ({ ...n, read: true })),
  })),

  // ── Filter ──
  on(setFilter, (state, { filter }) => (
    {
      ...state,
      filter,
    }
  )
)
);
