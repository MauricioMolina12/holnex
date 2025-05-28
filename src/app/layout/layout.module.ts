import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { AlertNewPromotionsComponent } from './components/alert-new-promotions/alert-new-promotions.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    CoreModule,
    AlertNewPromotionsComponent,
  ]
})
export class LayoutModule { }
