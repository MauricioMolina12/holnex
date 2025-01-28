import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropdownCountriesComponent } from './shared/components/dropdown-countries/dropdown-countries.component';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LayoutComponent } from './features/layout/layout.component';
import { NavBarComponent } from "./shared/components/nav-bar/nav-bar.component";
import { AlertNewPromotionsComponent } from "./shared/components/alert-new-promotions/alert-new-promotions.component";


@NgModule({
  declarations: [
    AppComponent,
    DropdownCountriesComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NavBarComponent,
    AlertNewPromotionsComponent
],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
