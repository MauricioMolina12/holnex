import { Component, computed, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-card-product-shopcart',
  templateUrl: './card-product-shopcart.component.html',
  styleUrl: './card-product-shopcart.component.scss',
  standalone: false,
})
export class CardProductShopcartComponent {
  @Input() product!: any;
  @Input() selected = false;
  @Input() lowStock: number | null = null;

  @Output() selectedChange = new EventEmitter<boolean>();
  @Output() saveForLater = new EventEmitter<void>();
  @Output() removeItem = new EventEmitter<void>();

  quantity = signal(1);

  subtotal = computed(() => (this.product?.price ?? 0) * this.quantity());

  get deliveryDate(): string {
    const date = new Date();
    date.setDate(date.getDate() + 4);
    return date.toLocaleDateString('es-CO', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  }

  onQuantityChange(value: number) {
    this.quantity.set(value);
  }

  toggleSelect() {
    this.selectedChange.emit(!this.selected);
  }

  onSaveForLater() {
    this.saveForLater.emit();
  }

  onRemove() {
    this.removeItem.emit();
  }
}
