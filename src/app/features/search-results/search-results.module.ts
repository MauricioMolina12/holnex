import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchResultsRoutingModule } from './search-results-routing.module';
import { SearchResultsComponent } from './search-results.component';
import { ProductsModule } from '../products/products.module';
import { FiltersComponent } from "../../shared/components/filters/filters.component";


@NgModule({
  declarations: [
    SearchResultsComponent
  ],
  imports: [
    CommonModule,
    SearchResultsRoutingModule,
    ProductsModule,
    FiltersComponent
]
})
export class SearchResultsModule { }
