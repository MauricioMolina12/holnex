import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropdownCountriesComponent } from './features/auth/components/dropdown-countries/dropdown-countries.component';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LayoutComponent } from './layout/layout.component';
import { AlertNewPromotionsComponent } from './layout/components/alert-new-promotions/alert-new-promotions.component';
import { FiltersComponent } from './shared/components/ui/filters/filters.component';
import { CategoryDetailsComponent } from './features/categories/components/category-details/category-details.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CoreModule } from './core/core.module';
import { StatusUiMessageComponent } from "./core/components/status-ui-message/status-ui-message.component";
import { GlobalLoaderComponent } from './core/components/global-loader/global-loader.component';

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
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
    StatusUiMessageComponent
],
  providers: [provideClientHydration(), provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
