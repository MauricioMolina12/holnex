import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FavoritesComponent } from './favorites.component';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { favoritesReducer } from './store/favorites.reducer';
import { FavoritesEffects } from './store/favorites.effects';
import { BreadcrumbsComponent } from '../../shared/components/breadcrumbs/breadcrumbs.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { ProductCardComponent } from '../../shared/components/products/product-card/product-card.component';
import { SkeletonComponent } from '../../core/components/skeleton/skeleton.component';
import { StatusUiMessageComponent } from '../../core/components/status-ui-message/status-ui-message.component';

@NgModule({
  declarations: [
    FavoritesComponent,
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    StoreModule.forFeature('favorites', favoritesReducer),
    EffectsModule.forFeature([FavoritesEffects]),
    BreadcrumbsComponent,
    ButtonComponent,
    ProductCardComponent,
    SkeletonComponent,
    StatusUiMessageComponent,
  ],
})
export class FavoritesModule {}
