import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopcartRoutingModule } from './shopcart-routing.module';
import { ShopcartComponent } from '../shopcart/shopcart.component';
import { CardProductShopcartComponent } from './components/card-product-shopcart/card-product-shopcart.component';
import { CardSummaryShoppingComponent } from './components/card-summary-shopping/card-summary-shopping.component';
import { StepsIndicatorComponent } from "../../shared/components/steps-indicator/steps-indicator.component";
import { DropdownComponent } from '../../shared/components/ui/dropdown/dropdown.component';
import { ButtonComponent } from "../../shared/components/ui/button/button.component";
import { InputComponent } from "../../shared/components/ui/input/input.component";
import { ProductsSliderComponent } from '../../shared/components/products/products-slider/products-slider.component';
import { QuantitySelectorComponent } from '../../shared/components/quantity-selector/quantity-selector.component';
import { BreadcrumbsComponent } from "../../shared/components/breadcrumbs/breadcrumbs.component";


@NgModule({
  declarations: [
    ShopcartComponent,
    CardProductShopcartComponent,
    CardSummaryShoppingComponent
  ],
  imports: [
    CommonModule,
    ShopcartRoutingModule,
    StepsIndicatorComponent,
    DropdownComponent,
    ButtonComponent,
    InputComponent,
    ProductsSliderComponent,
    QuantitySelectorComponent,
    BreadcrumbsComponent
]
})
export class ShopcartModule { }
