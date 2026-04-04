import { Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { Notification } from '../models/notification.model';
import {
  loadNotifications,
  markAsRead,
  markAllAsRead,
  setFilter,
} from '../store/notifications.actions';
import {
  selectAllNotifications,
  selectUnreadNotifications,
  selectUnreadCount,
  selectFilteredNotifications,
  selectNotificationsFilter,
  selectNotificationsLoading,
  selectNotificationsLoaded,
  selectNotificationsError,
} from '../store/notifications.selectors';

/**
 * Facade that centralizes all notification interactions.
 *
 * - Exposes **signals** for template binding (no async pipe needed).
 * - Delegates to NgRx store — components never dispatch actions directly.
 * - SSR-safe: no window/localStorage access here.
 */
@Injectable({ providedIn: 'root' })
export class NotificationsFacade {

  readonly notifications: Signal<Notification[]>;
  readonly unreadNotifications: Signal<Notification[]>;
  readonly unreadCount: Signal<number>;
  readonly filteredNotifications: Signal<Notification[]>;
  readonly filter: Signal<'all' | 'unread'>;
  readonly loading: Signal<boolean>;
  readonly loaded: Signal<boolean>;
  readonly error: Signal<string | null>;

  constructor(private store: Store) {
    this.notifications        = toSignal(this.store.select(selectAllNotifications),        { initialValue: [] });
    this.unreadNotifications  = toSignal(this.store.select(selectUnreadNotifications),     { initialValue: [] });
    this.unreadCount          = toSignal(this.store.select(selectUnreadCount),             { initialValue: 0 });
    this.filteredNotifications = toSignal(this.store.select(selectFilteredNotifications),  { initialValue: [] });
    this.filter               = toSignal(this.store.select(selectNotificationsFilter),     { initialValue: 'all' });
    this.loading              = toSignal(this.store.select(selectNotificationsLoading),    { initialValue: false });
    this.loaded               = toSignal(this.store.select(selectNotificationsLoaded),     { initialValue: false });
    this.error                = toSignal(this.store.select(selectNotificationsError),      { initialValue: null });
  }

  load(): void {
    this.store.dispatch(loadNotifications());
  }

  markAsRead(id: string): void {
    this.store.dispatch(markAsRead({ id }));
  }

  markAllAsRead(): void {
    this.store.dispatch(markAllAsRead());
  }

  setFilter(filter: 'all' | 'unread'): void {
    this.store.dispatch(setFilter({ filter }));
  }
}
