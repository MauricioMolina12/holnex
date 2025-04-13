import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductComponent } from './components/card-product/card-product.component';
import { ProductsGridComponent } from './components/products/products-grid.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SliderProductsComponent } from './components/slider-products/slider-products.component';
import { StarProductComponent } from './components/star-product/star-product.component';
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
    StarProductComponent,
    CardProductComponent,
    SliderProductsComponent
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
  exports: [ProductsGridComponent, StarProductComponent, CardProductComponent, SliderProductsComponent],
})
export class ProductsModule {}
