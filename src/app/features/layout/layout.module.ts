import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { AlertNewPromotionsComponent } from '../../shared/components/alert-new-promotions/alert-new-promotions.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NavBarComponent,
    AlertNewPromotionsComponent
  ]
})
export class LayoutModule { }
