import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ButtonComponent } from "../../shared/components/ui/button/button.component";



@NgModule({
  declarations: [
    CategoriesListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CategoryDetailsComponent,
    NgxSkeletonLoaderModule,
    ButtonComponent
],
  exports: [CategoriesListComponent, CategoryDetailsComponent]
})
export class CategoriesModule { }
