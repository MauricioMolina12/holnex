import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { AlertNewPromotionsComponent } from './components/alert-new-promotions/alert-new-promotions.component';
import { CoreModule } from '../core/core.module';
import { NotificationsAlertComponent } from '../shared/components/notifications-alert/notifications-alert.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    CoreModule,
    AlertNewPromotionsComponent,
    NotificationsAlertComponent,
  ]
})
export class LayoutModule { }
