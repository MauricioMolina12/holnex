import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductsGridComponent } from './components/products-grid/products-grid.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsSliderComponent } from './components/products-slider/products-slider.component';
import { ProductStarComponent } from './components/product-star/product-star.component';
import { TruncatePipe } from '../../shared/pipes/shared.pipe';
import { CategoriesModule } from '../categories/categories.module';
import { ProductsRoutingModule } from './products-routing.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ZoomImageDirective } from '../../shared/directives/zoom-image.directive';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { productReducer } from './store/reducers/product.reducer';
import { ProductEffects } from './store/effects/product.effects';
import { CardProductSkeletonComponent } from '../../shared/components/card-product-skeleton/card-product-skeleton.component';

@NgModule({
  declarations: [
    ProductsGridComponent,
    ProductDetailsComponent,
    ProductStarComponent,
    ProductCardComponent,
    ProductsSliderComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    TruncatePipe,
    CategoriesModule,
    NgxSkeletonLoaderModule,
    ZoomImageDirective,
    CardProductSkeletonComponent
],
  exports: [ProductsGridComponent, ProductStarComponent, ProductCardComponent, ProductsSliderComponent],
})
export class ProductsModule {}
