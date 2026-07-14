import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import * as PaymentActions from '../../store/payment.actions';
import {
  selectOrder,
  selectOrderTotals,
  selectSavedAddresses,
  selectSelectedShippingAddressId,
  selectSelectedBillingAddressId,
  selectBillingSameAsShipping,
  selectSelectedShippingAddress,
  selectSavedCards,
  selectSelectedCardId,
  selectSelectedCard,
  selectPaymentProcessing,
  selectPaymentResult,
  selectPaymentLoading,
  selectPaymentError,
} from '../../store/payment.selectors';

const CARD_BRAND_LOGOS: Record<string, string> = {
  visa: 'assets/img/payments-methods/visa.svg',
  mastercard: 'assets/img/payments-methods/mastercard.svg',
  'american express': 'assets/img/payments-methods/american-express.svg',
  amex: 'assets/img/payments-methods/american-express.svg',
  codensa: 'assets/img/payments-methods/codensa.svg',
};

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private router = inject(Router);

  order = toSignal(this.store.select(selectOrder), { initialValue: null });
  totals = toSignal(this.store.select(selectOrderTotals), { initialValue: null });
  savedAddresses = toSignal(this.store.select(selectSavedAddresses), { initialValue: [] });
  selectedShippingId = toSignal(this.store.select(selectSelectedShippingAddressId), { initialValue: null });
  selectedBillingId = toSignal(this.store.select(selectSelectedBillingAddressId), { initialValue: null });
  billingSameAsShipping = toSignal(this.store.select(selectBillingSameAsShipping), { initialValue: true });
  selectedShipping = toSignal(this.store.select(selectSelectedShippingAddress), { initialValue: null });
  savedCards = toSignal(this.store.select(selectSavedCards), { initialValue: [] });
  selectedCardId = toSignal(this.store.select(selectSelectedCardId), { initialValue: null });
  selectedCard = toSignal(this.store.select(selectSelectedCard), { initialValue: null });
  processing = toSignal(this.store.select(selectPaymentProcessing), { initialValue: false });
  result = toSignal(this.store.select(selectPaymentResult), { initialValue: null });
  loading = toSignal(this.store.select(selectPaymentLoading), { initialValue: false });
  error = toSignal(this.store.select(selectPaymentError), { initialValue: null });

  step = signal<1 | 2 | 3>(1);
  editingBilling = signal(false);

  canContinue = computed(() => !!this.selectedShippingId() && !!this.selectedCardId());

  ngOnInit(): void {
    if (!this.order()) {
      this.router.navigate(['/shopcart']);
      return;
    }
    this.store.dispatch(PaymentActions.loadSavedAddresses());
    this.store.dispatch(PaymentActions.loadSavedCards());
  }

  ngOnDestroy(): void {
    this.store.dispatch(PaymentActions.resetPayment());
  }

  selectShipping(addressId: string): void {
    this.store.dispatch(PaymentActions.selectShippingAddress({ addressId }));
  }

  selectBilling(addressId: string): void {
    this.store.dispatch(PaymentActions.selectBillingAddress({ addressId }));
  }

  toggleBillingSameAsShipping(): void {
    const next = !this.billingSameAsShipping();
    this.store.dispatch(PaymentActions.setBillingSameAsShipping({ same: next }));
    this.editingBilling.set(!next);
  }

  selectCard(cardId: string): void {
    this.store.dispatch(PaymentActions.selectCard({ cardId }));
  }

  brandLogo(brand: string): string | null {
    return CARD_BRAND_LOGOS[brand?.toLowerCase()] ?? null;
  }

  goToStep(s: 1 | 2 | 3): void {
    this.step.set(s);
  }

  confirmPayment(): void {
    const order = this.order();
    if (!order) return;
    this.store.dispatch(PaymentActions.processPayment({
      request: {
        provider: 'stripe',
        order,
        savedCardId: this.selectedCardId() ?? undefined,
        shippingAddressId: this.selectedShippingId() ?? undefined,
        billingAddressId: this.selectedBillingId() ?? undefined,
      },
    }));
    this.step.set(3);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
