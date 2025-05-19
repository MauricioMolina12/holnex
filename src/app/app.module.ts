import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropdownCountriesComponent } from './shared/components/dropdown-countries/dropdown-countries.component';
import { HttpClientModule, withInterceptors } from '@angular/common/http';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LayoutComponent } from './layout/layout.component';
import { NavBarComponent } from './core/components/nav-bar/nav-bar.component';
import { AlertNewPromotionsComponent } from './shared/components/alert-new-promotions/alert-new-promotions.component';
import { FiltersComponent } from './shared/components/filters/filters.component';
import { CategoryDetailsComponent } from './features/categories/components/category-details/category-details.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './features/products/store/reducers/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './features/products/store/effects/product.effects';
import { GridComponent } from './shared/components/grid/grid.component';
import { networkInterceptor } from './core/interceptors/network.interceptor';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent, DropdownCountriesComponent, LayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AlertNewPromotionsComponent,
    FiltersComponent,
    CategoryDetailsComponent,
    GridComponent,
    NgxSkeletonLoaderModule,
    CoreModule,

    StoreModule.forRoot({ products: productReducer }),
    EffectsModule.forRoot([ProductEffects]),
  ],
  providers: [provideClientHydration(), provideHttpClient(withFetch(), withInterceptors([networkInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {}
