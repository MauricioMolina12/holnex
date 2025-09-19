import { Component, Input, OnInit } from '@angular/core';
import { SummaryShopping } from '../../models/summary-shopping';
import { paymentMethods } from '../../../../shared/data/payments-methods';
import { paymentsMethod } from '../../../../shared/models/paymentsMethods';
import { PaymentsService } from '../../../payments/services/payments.service';

@Component({
  selector: 'app-card-summary-shopping',
  templateUrl: './card-summary-shopping.component.html',
  styleUrl: './card-summary-shopping.component.scss',
})
export class CardSummaryShoppingComponent implements OnInit {
  @Input() summary!: SummaryShopping;
  paymentMethods: paymentsMethod[] = [];

  constructor(private paymentsService: PaymentsService) {}

  ngOnInit(): void {
    this.paymentsService
      .getPaymentsMethdos()
      .subscribe((methods) => (this.paymentMethods = methods));
  }
}
