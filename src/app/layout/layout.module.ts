import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AlertNewPromotionsComponent } from './components/alert-new-promotions/alert-new-promotions.component';
import { FooterComponent } from './components/footer/footer.component';
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
