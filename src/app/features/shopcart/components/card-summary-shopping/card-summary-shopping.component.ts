import { Component, Input, OnInit, signal } from '@angular/core';
import { CartSummaryItem, SummaryShopping } from '../../models/summary-shopping';
import { paymentsMethod } from '../../../../shared/models/paymentsMethods';
import { PaymentsService } from '../../../payments/services/payments.service';

@Component({
  selector: 'app-card-summary-shopping',
  templateUrl: './card-summary-shopping.component.html',
  styleUrl: './card-summary-shopping.component.scss',
  standalone: false,
})
export class CardSummaryShoppingComponent implements OnInit {
  @Input() summary!: SummaryShopping;

  paymentMethods: paymentsMethod[] = [];
  cartSummaryItems: CartSummaryItem[] = [];

  // Coupon state
  couponCode = signal('');
  couponApplied = signal(false);
  couponError = signal(false);

  constructor(private paymentsService: PaymentsService) {}

  ngOnInit(): void {
    this.cartSummaryItems = [
      {
        label: this.summary.numberOfProducts === 1 ? 'Producto' : 'Productos',
        value: this.summary.numberOfProducts.toString(),
        icon: 'icon-box',
      },
      {
        label: 'Subtotal',
        value: `$${this.summary.totalPrice.toFixed(2)}`,
        icon: 'icon-receipt',
      },
      {
        label: 'Descuento',
        value: this.couponApplied() ? `-$${(this.summary.totalPrice * 0.1).toFixed(2)}` : `$0.00`,
        icon: 'icon-percent_discount',
      },
      {
        label: 'Envío',
        value: 'Gratis',
        icon: 'icon-truck',
      },
      {
        label: 'Total',
        value: `$${this.summary.totalPrice.toFixed(2)}`,
        icon: 'icon-price',
      },
    ];

    this.paymentsService
      .getPaymentsMethdos()
      .subscribe((methods) => (this.paymentMethods = methods));
  }

  onCouponInput(event: Event) {
    this.couponCode.set((event.target as HTMLInputElement).value);
    this.couponError.set(false);
  }

  applyCoupon() {
    const code = this.couponCode().trim().toUpperCase();
    if (!code) return;
    if (code === 'HOLNEX10') {
      this.couponApplied.set(true);
      this.couponError.set(false);
    } else {
      this.couponError.set(true);
    }
  }

  removeCoupon() {
    this.couponCode.set('');
    this.couponApplied.set(false);
    this.couponError.set(false);
  }
}
