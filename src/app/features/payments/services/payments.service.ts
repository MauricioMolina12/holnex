import { Injectable } from '@angular/core';
import { paymentMethods } from '../../../shared/data/payments-methods';
import { map, Observable, of } from 'rxjs';
import { paymentsMethod } from '../../../shared/models/paymentsMethods';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  constructor() {}

  paymentsMethods = paymentMethods;

  getPaymentsMethdos() {
    return of(paymentMethods);
  }
}
