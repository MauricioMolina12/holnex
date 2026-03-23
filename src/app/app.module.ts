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
import { PromoBannerComponent } from './layout/components/promo-banner/promo-banner.component';
import { FiltersComponent } from './shared/components/ui/filters/filters.component';
import { CategoryDetailsComponent } from './features/categories/components/category-details/category-details.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CoreModule } from './core/core.module';
import { StatusUiMessageComponent } from "./core/components/status-ui-message/status-ui-message.component";
import { GlobalLoaderComponent } from './core/components/global-loader/global-loader.component';
import { NotificationsAlertComponent } from "./shared/components/notifications-alert/notifications-alert.component";
import { NotificationsModalComponent } from './shared/components/notifications-modal/notifications-modal.component';
import { CloseOutsideDirective } from './shared/directives/close-outside.directive';
import { SearchBarComponent } from './shared/components/search-bar/search-bar.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { ShareComponent } from './shared/components/share/share.component';
import { TooltipDirective } from './shared/directives/tooltip.directive';

@NgModule({
  declarations: [AppComponent, DropdownCountriesComponent, LayoutComponent, GlobalLoaderComponent, NotificationsModalComponent, SearchBarComponent, ModalComponent, ShareComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PromoBannerComponent,
    FiltersComponent,
    CategoryDetailsComponent,
    NgxSkeletonLoaderModule,
    CoreModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
    StatusUiMessageComponent,
    NotificationsAlertComponent,
    TooltipDirective
  ],
  exports: [TooltipDirective],
  providers: [provideClientHydration(), provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
