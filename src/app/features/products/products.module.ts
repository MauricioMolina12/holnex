import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { TruncatePipe } from '../../shared/pipes/shared.pipe';
import { CategoriesModule } from '../categories/categories.module';
import { ProductsRoutingModule } from './products-routing.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ZoomImageDirective } from '../../shared/directives/zoom-image.directive';
import { CardUserCommentComponent } from '../../shared/components/card-user-comment/card-user-comment.component';
import { FiltersComponent } from '../../shared/components/ui/filters/filters.component';
import { SkeletonComponent } from '../../core/components/skeleton/skeleton.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { ProductsSliderComponent } from '../../shared/components/products/products-slider/products-slider.component';
import { SellersModule } from '../sellers/sellers.module';

@NgModule({
  declarations: [
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    TruncatePipe,
    CategoriesModule,
    NgxSkeletonLoaderModule,
    ZoomImageDirective,
    SkeletonComponent,
    CardUserCommentComponent,
    FiltersComponent,
    ButtonComponent,
    ProductsSliderComponent,
    SellersModule
],
})
export class ProductsModule {}
