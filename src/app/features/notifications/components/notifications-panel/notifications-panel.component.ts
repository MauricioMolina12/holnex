import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Signal,
} from '@angular/core';
import { NotificationsFacade } from '../../facades/notifications.facade';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { Notification } from '../../models/notification.model';

@Component({
  selector: 'app-notifications-panel',
  templateUrl: './notifications-panel.component.html',
  styleUrl: './notifications-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class NotificationsPanelComponent implements OnInit {
  filteredNotifications: Signal<Notification[]>;
  filter: Signal<'all' | 'unread'>;
  unreadCount: Signal<number>;
  loading: Signal<boolean>;

  openNotificationId: string | null = null;

  constructor(
    private notificationsFacade: NotificationsFacade,
    private modalService: ModalService,
  ) {
    this.filteredNotifications = this.notificationsFacade.filteredNotifications;
    this.filter = this.notificationsFacade.filter;
    this.unreadCount = this.notificationsFacade.unreadCount;
    this.loading = this.notificationsFacade.loading;
  }

  ngOnInit(): void {
    if (!this.notificationsFacade.loaded()) {
      this.notificationsFacade.load();
    }
  }

  onFilterChange(filter: 'all' | 'unread'): void {
    this.notificationsFacade.setFilter(filter);
  }

  onMarkAsRead(id: string): void {
    this.notificationsFacade.markAsRead(id);
  }

  onMarkAllAsRead(): void {
    this.notificationsFacade.markAllAsRead();
  }

  close(): void {
    this.modalService.close();
  }

  onToggleNotification(id: string) {
    this.openNotificationId = this.openNotificationId === id ? null : id;
  }
}
