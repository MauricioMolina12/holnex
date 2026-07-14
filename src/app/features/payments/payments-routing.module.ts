import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './pages/checkout/checkout.component';

// Future-proof: external apps may redirect into checkout with query params,
// e.g. /checkout?orderId=...&token=... or path params like /checkout/:orderId.
// When that lands, resolve the order via a guard/resolver that hydrates the
// payment store with `setOrder` before activating the route.
const routes: Routes = [
  { path: '', component: CheckoutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
