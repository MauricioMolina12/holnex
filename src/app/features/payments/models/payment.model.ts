export type PaymentProviderType = 'stripe' | 'ebanx' | 'paypal';

export interface OrderItem {
  productId: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

export interface CheckoutOrder {
  items: OrderItem[];
  couponCode?: string;
  couponDiscount?: number;
}

export interface SavedAddress {
  id: string;
  alias: string;
  recipientName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone?: string;
  isDefault: boolean;
}

export interface SavedCard {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  holderName: string;
  isDefault: boolean;
}

export interface PaymentRequest {
  provider: PaymentProviderType;
  order: CheckoutOrder;
  savedCardId?: string;
  shippingAddressId?: string;
  billingAddressId?: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId: string;
  message: string;
}

export interface PaymentState {
  order: CheckoutOrder | null;
  savedAddresses: SavedAddress[];
  savedCards: SavedCard[];
  selectedShippingAddressId: string | null;
  selectedBillingAddressId: string | null;
  billingSameAsShipping: boolean;
  selectedProvider: PaymentProviderType | null;
  selectedCardId: string | null;
  processing: boolean;
  result: PaymentResult | null;
  loading: boolean;
  error: string | null;
}
