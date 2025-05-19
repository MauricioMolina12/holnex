import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchInputComponent } from '../shared/components/search-input/search-input.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SearchInputComponent
  ],
  exports: [
    NavBarComponent,
    FooterComponent
  ]
})
export class CoreModule { }
