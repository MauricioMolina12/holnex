import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { MyStoresRoutingModule } from './my-stores-routing.module';
import { myStoresReducer, storeProductsReducer } from './store/my-stores.reducer';
import { MyStoresEffects } from './store/my-stores.effects';

// Components
import { StoreSelectorComponent } from './pages/store-selector/store-selector.component';
import { StoreLayoutComponent } from './components/store-layout/store-layout.component';
import { StoreHomeComponent } from './pages/store-home/store-home.component';
import { StoreProductsComponent } from './pages/store-products/store-products.component';
import { StorePlaceholderComponent } from './pages/store-placeholder/store-placeholder.component';
import { StoreCardComponent } from './components/store-card/store-card.component';
import { StoreCardStatsComponent } from './components/store-card-stats/store-card-stats.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';

@NgModule({
  declarations: [
    StoreSelectorComponent,
    StoreLayoutComponent,
    StoreHomeComponent,
    StoreProductsComponent,
    StorePlaceholderComponent,
    StoreCardComponent,
    StoreCardStatsComponent,
    ProductFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MyStoresRoutingModule,
    StoreModule.forFeature('myStores', myStoresReducer),
    StoreModule.forFeature('storeProducts', storeProductsReducer),
    EffectsModule.forFeature([MyStoresEffects]),
    NgxSkeletonLoaderModule,
  ],
})
export class MyStoresModule {}
