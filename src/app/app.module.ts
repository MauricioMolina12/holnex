import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropdownCountriesComponent } from './features/auth/components/dropdown-countries/dropdown-countries.component';
import { HttpClientModule, withInterceptors } from '@angular/common/http';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LayoutComponent } from './layout/layout.component';
import { NavBarComponent } from './layout/components/nav-bar/nav-bar.component';
import { AlertNewPromotionsComponent } from './layout/components/alert-new-promotions/alert-new-promotions.component';
import { FiltersComponent } from './shared/components/filters/filters.component';
import { CategoryDetailsComponent } from './features/categories/components/category-details/category-details.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './features/products/store/reducers/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './features/products/store/effects/product.effects';
import { networkInterceptor } from './core/interceptors/network.interceptor';
import { CoreModule } from './core/core.module';
import { StatusUiMessageComponent } from "./shared/components/status-ui-message/status-ui-message.component";
import { GlobalLoaderComponent } from './shared/components/global-loader/global-loader.component';

@NgModule({
  declarations: [AppComponent, DropdownCountriesComponent, LayoutComponent, GlobalLoaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AlertNewPromotionsComponent,
    FiltersComponent,
    CategoryDetailsComponent,
    NgxSkeletonLoaderModule,
    CoreModule,
    StoreModule.forRoot({ products: productReducer }),
    EffectsModule.forRoot([ProductEffects]),
    StatusUiMessageComponent
],
  providers: [provideClientHydration(), provideHttpClient(withFetch(), withInterceptors([networkInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {}
