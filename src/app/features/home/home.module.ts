import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AdsSliderComponent } from '../../shared/components/ads-slider/ads-slider.component';
import { ProductsComponent } from '../../shared/components/products/products.component';
import { SearchInputComponent } from '../../shared/components/search-input/search-input.component';
import { CategoriesComponent } from '../../shared/components/categories/categories.component';
import { FiltersComponent } from '../../shared/components/filters/filters.component';
import { SliderProductsComponent } from '../../shared/components/slider-products/slider-products.component';
import { StarProductComponent } from '../../shared/components/star-product/star-product.component';

@NgModule({
  declarations: [HomeComponent], 
  imports: [
    CommonModule,
    HomeRoutingModule, 
    AdsSliderComponent, 
    ProductsComponent,
    SearchInputComponent,
    CategoriesComponent,
    FiltersComponent,
    SliderProductsComponent,
    StarProductComponent
  ],
})
export class HomeModule {}
