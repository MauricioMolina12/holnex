import { createReducer, on } from '@ngrx/store';
import { PaymentState } from '../models/payment.model';
import * as PaymentActions from './payment.actions';

export const initialPaymentState: PaymentState = {
  order: null,
  savedAddresses: [],
  savedCards: [],
  selectedShippingAddressId: null,
  selectedBillingAddressId: null,
  billingSameAsShipping: true,
  selectedProvider: 'stripe',
  selectedCardId: null,
  processing: false,
  result: null,
  loading: false,
  error: null,
};

export const paymentReducer = createReducer(
  initialPaymentState,

  // ── Order ──
  on(PaymentActions.setOrder, (state, { order }) => ({
    ...state, order, error: null,
  })),

  // ── Saved addresses ──
  on(PaymentActions.loadSavedAddresses, (state) => ({
    ...state, loading: true,
  })),
  on(PaymentActions.loadSavedAddressesSuccess, (state, { addresses }) => {
    const defaultAddress = addresses.find((a) => a.isDefault) ?? addresses[0];
    const defaultId = defaultAddress?.id ?? null;
    return {
      ...state,
      savedAddresses: addresses,
      selectedShippingAddressId: state.selectedShippingAddressId ?? defaultId,
      selectedBillingAddressId: state.selectedBillingAddressId ?? defaultId,
      loading: false,
    };
  }),
  on(PaymentActions.loadSavedAddressesFailure, (state, { error }) => ({
    ...state, loading: false, error,
  })),
  on(PaymentActions.selectShippingAddress, (state, { addressId }) => ({
    ...state,
    selectedShippingAddressId: addressId,
    selectedBillingAddressId: state.billingSameAsShipping
      ? addressId
      : state.selectedBillingAddressId,
  })),
  on(PaymentActions.selectBillingAddress, (state, { addressId }) => ({
    ...state, selectedBillingAddressId: addressId,
  })),
  on(PaymentActions.setBillingSameAsShipping, (state, { same }) => ({
    ...state,
    billingSameAsShipping: same,
    selectedBillingAddressId: same
      ? state.selectedShippingAddressId
      : state.selectedBillingAddressId,
  })),

  // ── Saved cards ──
  on(PaymentActions.loadSavedCards, (state) => ({
    ...state, loading: true,
  })),
  on(PaymentActions.loadSavedCardsSuccess, (state, { cards }) => {
    const defaultCard = cards.find((c) => c.isDefault) ?? cards[0];
    return {
      ...state,
      savedCards: cards,
      selectedCardId: state.selectedCardId ?? defaultCard?.id ?? null,
      loading: false,
    };
  }),
  on(PaymentActions.loadSavedCardsFailure, (state, { error }) => ({
    ...state, loading: false, error,
  })),

  // ── Selection ──
  on(PaymentActions.selectProvider, (state, { provider }) => ({
    ...state, selectedProvider: provider, selectedCardId: null,
  })),
  on(PaymentActions.selectCard, (state, { cardId }) => ({
    ...state, selectedCardId: cardId,
  })),

  // ── Process ──
  on(PaymentActions.processPayment, (state) => ({
    ...state, processing: true, error: null,
  })),
  on(PaymentActions.processPaymentSuccess, (state, { result }) => ({
    ...state, processing: false, result,
  })),
  on(PaymentActions.processPaymentFailure, (state, { error }) => ({
    ...state, processing: false, error,
  })),

  // ── Reset ──
  on(PaymentActions.resetPayment, () => initialPaymentState),
);
