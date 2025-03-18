import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopcartRoutingModule } from './shopcart-routing.module';
import { ShopcartComponent } from './shopcart.component';
import { NavBarComponent } from "../../shared/components/nav-bar/nav-bar.component";


@NgModule({
  declarations: [
    ShopcartComponent
  ],
  imports: [
    CommonModule,
    ShopcartRoutingModule,
    NavBarComponent
]
})
export class ShopcartModule { }
