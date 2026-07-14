import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PaymentsRoutingModule } from './payments-routing.module';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { paymentReducer } from './store/payment.reducer';
import { PaymentEffects } from './store/payment.effects';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    ButtonComponent,
    StoreModule.forFeature('payment', paymentReducer),
    EffectsModule.forFeature([PaymentEffects]),
  ],
})
export class PaymentsModule {}
