import { paymentsMethod } from "../models/paymentsMethods";

export const paymentMethods:  paymentsMethod[] = [
  {
    type: 'credit_card',
    label: 'Tarjeta de crédito',
    values: [
      { image: 'assets/img/payments-methods/visa.svg', name: 'Visa' },
      {
        image: 'assets/img/payments-methods/mastercard.svg',
        name: 'Mastercard',
      },
      {
        image: 'assets/img/payments-methods/american-express.svg',
        name: 'American Express',
      },
      { image: 'assets/img/payments-methods/codensa.svg', name: 'Codensa' },
    ],
  },
  {
    type: 'debit_card',
    label: 'Tarjeta de débito',
    values: [
      {
        image: 'assets/img/payments-methods/visa-debito.svg',
        name: 'Visa débito',
      },
      {
        image: 'assets/img/payments-methods/mastercard-debito.svg',
        name: 'Mastercard débito',
      },
    ],
  },
  {
    type: 'efective',
    label: 'Efectivo',
    values: [
      { image: 'assets/img/payments-methods/efecty.svg', name: 'Efecty' },
    ],
  },
];
