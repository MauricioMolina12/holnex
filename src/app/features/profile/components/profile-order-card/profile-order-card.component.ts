import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Order, OrderStatus } from '../../models/profile.model';

@Component({
  selector: 'app-profile-order-card',
  templateUrl: './profile-order-card.component.html',
  styleUrl: './profile-order-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ProfileOrderCardComponent {
  @Input() order!: Order;
  @Output() viewDetail = new EventEmitter<Order>();

  readonly statusConfig: Record<OrderStatus, { label: string; cssClass: string }> = {
    pending: { label: 'Pendiente', cssClass: 'status--pending' },
    processing: { label: 'En proceso', cssClass: 'status--processing' },
    shipped: { label: 'Enviado', cssClass: 'status--shipped' },
    delivered: { label: 'Entregado', cssClass: 'status--delivered' },
    cancelled: { label: 'Cancelado', cssClass: 'status--cancelled' },
  };

  get statusInfo() {
    return this.statusConfig[this.order.status];
  }

  get formattedDate(): string {
    return new Date(this.order.date).toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  get formattedTotal(): string {
    return `$${this.order.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`;
  }

  get visibleItems() {
    return this.order.items.slice(0, 3);
  }

  get extraItemsCount(): number {
    return Math.max(0, this.order.items.length - 3);
  }

  onViewDetail(): void {
    this.viewDetail.emit(this.order);
  }
}
