import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as PaymentActions from './payment.actions';
import { PaymentGatewayService } from '../services/payment-gateway.service';

@Injectable()
export class PaymentEffects {
  constructor(
    private actions$: Actions,
    private gateway: PaymentGatewayService,
  ) {}

  loadSavedAddresses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.loadSavedAddresses),
      switchMap(() =>
        this.gateway.getSavedAddresses().pipe(
          map((addresses) => PaymentActions.loadSavedAddressesSuccess({ addresses })),
          catchError((err) => of(PaymentActions.loadSavedAddressesFailure({ error: err.message })))
        )
      )
    )
  );

  loadSavedCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.loadSavedCards),
      switchMap(() =>
        this.gateway.getSavedCards().pipe(
          map((cards) => PaymentActions.loadSavedCardsSuccess({ cards })),
          catchError((err) => of(PaymentActions.loadSavedCardsFailure({ error: err.message })))
        )
      )
    )
  );

  processPayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.processPayment),
      switchMap(({ request }) =>
        this.gateway.processPayment(request).pipe(
          map((result) => PaymentActions.processPaymentSuccess({ result })),
          catchError((err) => of(PaymentActions.processPaymentFailure({ error: err.message })))
        )
      )
    )
  );
}
