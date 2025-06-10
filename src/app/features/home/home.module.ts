import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeroBannerComponent } from '../../shared/components/hero-banner/hero-banner.component';
import { SearchInputComponent } from '../../shared/components/search-input/search-input.component';
import { FiltersComponent } from '../../shared/components/filters/filters.component';
import { NewsletterSubscriptionComponent } from '../../shared/components/newsletter-subscription/newsletter-subscription.component';
import { ServicesGridComponent } from '../../shared/components/services-grid/services-grid.component';
import { ProductsModule } from '../products/products.module';
import { CategoriesModule } from '../categories/categories.module';
import { ProductsGridComponent } from '../../shared/components/products/products-grid/products-grid.component';
import { ProductsSliderComponent } from "../../shared/components/products/products-slider/products-slider.component";
import { HighlightShowcaseComponentComponent } from '../../shared/components/highlight-showcase-component/highlight-showcase-component.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HeroBannerComponent,
    SearchInputComponent,
    FiltersComponent,
    NewsletterSubscriptionComponent,
    ServicesGridComponent,
    ProductsModule,
    CategoriesModule,
    ProductsGridComponent,
    ProductsSliderComponent,
    HighlightShowcaseComponentComponent
],
})
export class HomeModule {}
