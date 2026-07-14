import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PaymentState } from '../models/payment.model';

export const selectPaymentState = createFeatureSelector<PaymentState>('payment');

export const selectOrder = createSelector(
  selectPaymentState, (s) => s.order
);
export const selectSavedAddresses = createSelector(
  selectPaymentState, (s) => s.savedAddresses
);
export const selectSelectedShippingAddressId = createSelector(
  selectPaymentState, (s) => s.selectedShippingAddressId
);
export const selectSelectedBillingAddressId = createSelector(
  selectPaymentState, (s) => s.selectedBillingAddressId
);
export const selectBillingSameAsShipping = createSelector(
  selectPaymentState, (s) => s.billingSameAsShipping
);
export const selectSelectedShippingAddress = createSelector(
  selectSavedAddresses,
  selectSelectedShippingAddressId,
  (addresses, id) => addresses.find((a) => a.id === id) ?? null
);
export const selectSelectedBillingAddress = createSelector(
  selectSavedAddresses,
  selectSelectedBillingAddressId,
  (addresses, id) => addresses.find((a) => a.id === id) ?? null
);
export const selectSavedCards = createSelector(
  selectPaymentState, (s) => s.savedCards
);
export const selectSelectedProvider = createSelector(
  selectPaymentState, (s) => s.selectedProvider
);
export const selectSelectedCardId = createSelector(
  selectPaymentState, (s) => s.selectedCardId
);
export const selectSelectedCard = createSelector(
  selectSavedCards,
  selectSelectedCardId,
  (cards, id) => cards.find((c) => c.id === id) ?? null
);
export const selectPaymentProcessing = createSelector(
  selectPaymentState, (s) => s.processing
);
export const selectPaymentResult = createSelector(
  selectPaymentState, (s) => s.result
);
export const selectPaymentLoading = createSelector(
  selectPaymentState, (s) => s.loading
);
export const selectPaymentError = createSelector(
  selectPaymentState, (s) => s.error
);

export const selectOrderTotals = createSelector(
  selectOrder,
  (order) => {
    if (!order) return null;
    const subtotal = order.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const discountAmount = order.couponDiscount ? subtotal * (order.couponDiscount / 100) : 0;
    const total = subtotal - discountAmount;
    return { subtotal, discountAmount, total, itemCount: order.items.length };
  }
);
