import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Notification } from '../../models/notification.model';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrl: './notification-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class NotificationItemComponent {
  @Input() notification!: Notification;
  @Input() isOpen = false;
  @Output() read = new EventEmitter<string>();
  @Output() toggle = new EventEmitter<string | null>();

  get iconClass(): string {
    const icons: Record<string, string> = {
      order: 'icon-truck',
      promotion: 'icon-shopping',
      system: 'icon-settings',
      info: 'icon-all_inbox',
    };
    return icons[this.notification.type] || 'icon-notifications';
  }

  get timeAgo(): string {
    const now = new Date();
    const created = new Date(this.notification.createdAt);
    const diffMs = now.getTime() - created.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays < 7) return `Hace ${diffDays}d`;
    return created.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
    });
  }

  onMarkAsRead(): void {
    if (!this.notification.read) {
      this.read.emit(this.notification.id);
    }
  }

  onToggleOptions(event: Event) {
    event.stopPropagation();
    this.toggle.emit(this.notification.id);
  }

  onCloseOptions() {
    this.toggle.emit(null);
    this.isOpen = false;
  }
}
