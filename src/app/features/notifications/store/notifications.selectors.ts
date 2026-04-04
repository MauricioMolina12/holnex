import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotificationsState } from '../models/notification.model';

export const selectNotificationsState = createFeatureSelector<NotificationsState>('notifications');

export const selectAllNotifications = createSelector(
  selectNotificationsState,
  (state) => state.notifications
);

export const selectUnreadNotifications = createSelector(
  selectAllNotifications,
  (notifications) => notifications.filter((n) => !n.read)
);

export const selectUnreadCount = createSelector(
  selectUnreadNotifications,
  (unread) => unread.length
);

export const selectNotificationsFilter = createSelector(
  selectNotificationsState,
  (state) => state.filter
);

export const selectFilteredNotifications = createSelector(
  selectAllNotifications,
  selectUnreadNotifications,
  selectNotificationsFilter,
  (all, unread, filter) => (filter === 'unread' ? unread : all)
);

export const selectNotificationsLoading = createSelector(
  selectNotificationsState,
  (state) => state.loading
);

export const selectNotificationsLoaded = createSelector(
  selectNotificationsState,
  (state) => state.loaded
);

export const selectNotificationsError = createSelector(
  selectNotificationsState,
  (state) => state.error
);
