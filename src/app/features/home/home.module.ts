import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeroImageComponent } from '../../shared/components/hero-image/hero-image.component';
import { SearchInputComponent } from '../../shared/components/search-input/search-input.component';
import { FiltersComponent } from '../../shared/components/filters/filters.component';
import { NewsletterSubscriptionComponent } from '../../shared/components/newsletter-subscription/newsletter-subscription.component';
import { ServicesGridComponent } from '../../shared/components/services-grid/services-grid.component';
import { ProductsModule } from '../products/products.module';
import { CategoriesModule } from '../categories/categories.module';
import { GridComponent } from '../../shared/components/grid/grid.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HeroImageComponent,
    SearchInputComponent,
    FiltersComponent,
    NewsletterSubscriptionComponent,
    ServicesGridComponent,
    ProductsModule,
    CategoriesModule,
    GridComponent
  ],
})
export class HomeModule {}
