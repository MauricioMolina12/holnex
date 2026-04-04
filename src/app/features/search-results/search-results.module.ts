import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SearchResultsRoutingModule } from './search-results-routing.module';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { searchReducer } from './store/search.reducer';
import { SearchEffects } from './store/search.effects';

import { ProductCardComponent } from '../../shared/components/products/product-card/product-card.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { SkeletonComponent } from '../../core/components/skeleton/skeleton.component';
import { StatusUiMessageComponent } from '../../core/components/status-ui-message/status-ui-message.component';
import { CheckboxFilterComponent } from '../../shared/components/ui/checkbox-filter/checkbox-filter.component';
import { PriceRangeComponent } from '../../shared/components/ui/price-range/price-range.component';
import { FilterTagsComponent } from '../../shared/components/ui/filter-tags/filter-tags.component';

@NgModule({
  declarations: [
    SearchResultsComponent,
  ],
  imports: [
    CommonModule,
    SearchResultsRoutingModule,
    StoreModule.forFeature('search', searchReducer),
    EffectsModule.forFeature([SearchEffects]),
    ProductCardComponent,
    PaginationComponent,
    SkeletonComponent,
    StatusUiMessageComponent,
    CheckboxFilterComponent,
    PriceRangeComponent,
    FilterTagsComponent,
  ],
})
export class SearchResultsModule {}
