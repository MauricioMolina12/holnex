import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopcartRoutingModule } from './shopcart-routing.module';
import { ShopcartComponent } from '../shopcart/shopcart.component';
import { CardProductShopcartComponent } from './components/card-product-shopcart/card-product-shopcart.component';
import { CardSummaryShoppingComponent } from './components/card-summary-shopping/card-summary-shopping.component';


@NgModule({
  declarations: [
    ShopcartComponent,
    CardProductShopcartComponent,
    CardSummaryShoppingComponent
  ],
  imports: [
    CommonModule,
    ShopcartRoutingModule
  ]
})
export class ShopcartModule { }
