import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopcartRoutingModule } from './shopcart-routing.module';
import { ShopcartComponent } from '../shopcart/shopcart.component';


@NgModule({
  declarations: [
    ShopcartComponent
  ],
  imports: [
    CommonModule,
    ShopcartRoutingModule
  ]
})
export class ShopcartModule { }
