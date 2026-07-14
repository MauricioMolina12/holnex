import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import {
  PaymentRequest,
  PaymentResult,
  SavedAddress,
  SavedCard,
} from '../models/payment.model';
import { HttpService } from '../../../core/services/http.service';

/**
 * Simulated payment gateway service.
 * Replace the `of()` calls with real HttpService calls when the backend is ready.
 */
@Injectable({ providedIn: 'root' })
export class PaymentGatewayService {
  constructor(private http: HttpService) {}

  getSavedAddresses(): Observable<SavedAddress[]> {
    // TODO: Replace with this.http.get('/users/addresses')
    const mockAddresses: SavedAddress[] = [
      {
        id: 'addr_1',
        alias: 'Casa',
        recipientName: 'Alfredo Molina',
        line1: 'Cra. 45 # 12-30',
        line2: 'Apto 502',
        city: 'Medellín',
        state: 'Antioquia',
        country: 'Colombia',
        postalCode: '050021',
        phone: '+57 300 123 4567',
        isDefault: true,
      },
      {
        id: 'addr_2',
        alias: 'Oficina',
        recipientName: 'Alfredo Molina',
        line1: 'Calle 10 # 4-22',
        city: 'Medellín',
        state: 'Antioquia',
        country: 'Colombia',
        postalCode: '050010',
        phone: '+57 300 123 4567',
        isDefault: false,
      },
    ];
    return of(mockAddresses).pipe(delay(400));
  }

  getSavedCards(): Observable<SavedCard[]> {
    // TODO: Replace with this.http.get('/payments/cards')
    const mockCards: SavedCard[] = [
      {
        id: 'card_1',
        brand: 'Visa',
        last4: '4242',
        expMonth: 12,
        expYear: 2027,
        holderName: 'Alfredo M',
        isDefault: true,
      },
      {
        id: 'card_2',
        brand: 'Mastercard',
        last4: '8310',
        expMonth: 6,
        expYear: 2028,
        holderName: 'Alfredo M',
        isDefault: false,
      },
    ];
    return of(mockCards).pipe(delay(400));
  }

  processPayment(request: PaymentRequest): Observable<PaymentResult> {
    // TODO: Replace with this.http.post('/payments/process', request)
    const mockResult: PaymentResult = {
      success: true,
      transactionId: `TXN-${Date.now()}`,
      message: 'Pago procesado exitosamente',
    };
    return of(mockResult).pipe(delay(2000));
  }
}
