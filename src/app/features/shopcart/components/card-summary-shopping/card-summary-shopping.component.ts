import { Component, Input, OnInit } from '@angular/core';
import {
  CartSummaryItem,
  SummaryShopping,
} from '../../models/summary-shopping';
import { paymentMethods } from '../../../../shared/data/payments-methods';
import { paymentsMethod } from '../../../../shared/models/paymentsMethods';
import { PaymentsService } from '../../../payments/services/payments.service';

@Component({
    selector: 'app-card-summary-shopping',
    templateUrl: './card-summary-shopping.component.html',
    styleUrl: './card-summary-shopping.component.scss',
    standalone: false
})
export class CardSummaryShoppingComponent implements OnInit {
  @Input() summary!: SummaryShopping;

  paymentMethods: paymentsMethod[] = [];
  cartSummaryItems: CartSummaryItem[] = [];

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
        value: `$0.00`,
        icon: 'icon-percent_discount',
      },
      {
        label: 'Envío',
        value: 0 === 0 ? 'Gratis' : `$0.00`,
        icon: 'icon-truck',
      },
      {
        label: 'Total',
        value: `$${this.summary.totalPrice.toFixed(2)}`,
        icon: 'icon-price',
      }
    ];

    this.paymentsService
      .getPaymentsMethdos()
      .subscribe((methods) => (this.paymentMethods = methods));
  }
}
