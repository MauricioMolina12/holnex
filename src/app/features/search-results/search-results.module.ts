import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchResultsRoutingModule } from './search-results-routing.module';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { FiltersComponent } from "../../shared/components/filters/filters.component";
import { ProductsGridComponent } from '../../shared/components/products/products-grid/products-grid.component';


@NgModule({
  declarations: [
    SearchResultsComponent
  ],
  imports: [
    CommonModule,
    SearchResultsRoutingModule,
    FiltersComponent,
    ProductsGridComponent
]
})
export class SearchResultsModule { }
