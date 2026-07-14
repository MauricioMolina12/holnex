import { createAction, props } from '@ngrx/store';
import {
  CheckoutOrder,
  PaymentProviderType,
  PaymentRequest,
  PaymentResult,
  SavedAddress,
  SavedCard,
} from '../models/payment.model';

// ── Set order (received from cart or buy-now) ──
export const setOrder = createAction(
  '[Payment] Set Order',
  props<{ order: CheckoutOrder }>()
);

// ── Saved addresses ──
export const loadSavedAddresses = createAction('[Payment] Load Saved Addresses');
export const loadSavedAddressesSuccess = createAction(
  '[Payment] Load Saved Addresses Success',
  props<{ addresses: SavedAddress[] }>()
);
export const loadSavedAddressesFailure = createAction(
  '[Payment] Load Saved Addresses Failure',
  props<{ error: string }>()
);
export const selectShippingAddress = createAction(
  '[Payment] Select Shipping Address',
  props<{ addressId: string }>()
);
export const selectBillingAddress = createAction(
  '[Payment] Select Billing Address',
  props<{ addressId: string }>()
);
export const setBillingSameAsShipping = createAction(
  '[Payment] Set Billing Same As Shipping',
  props<{ same: boolean }>()
);

// ── Saved cards ──
export const loadSavedCards = createAction('[Payment] Load Saved Cards');
export const loadSavedCardsSuccess = createAction(
  '[Payment] Load Saved Cards Success',
  props<{ cards: SavedCard[] }>()
);
export const loadSavedCardsFailure = createAction(
  '[Payment] Load Saved Cards Failure',
  props<{ error: string }>()
);

// ── Selection ──
export const selectProvider = createAction(
  '[Payment] Select Provider',
  props<{ provider: PaymentProviderType }>()
);
export const selectCard = createAction(
  '[Payment] Select Card',
  props<{ cardId: string }>()
);

// ── Process payment ──
export const processPayment = createAction(
  '[Payment] Process',
  props<{ request: PaymentRequest }>()
);
export const processPaymentSuccess = createAction(
  '[Payment] Process Success',
  props<{ result: PaymentResult }>()
);
export const processPaymentFailure = createAction(
  '[Payment] Process Failure',
  props<{ error: string }>()
);

// ── Reset ──
export const resetPayment = createAction('[Payment] Reset');
