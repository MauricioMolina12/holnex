import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ProductDetailsComponent } from '../features/products/components/product-details/product-details.component';
import { AuthService } from '../features/auth/auth.service';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    // canActivate: [false],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../features/home/home.module').then((m) => m.HomeModule),
      },

      // Ruta ubicada temporalmente
      {
        path: 'product/:slug',
        component: ProductDetailsComponent,
      },
      {
        path: 'product',
        loadChildren: () =>
          import('../features/products/products.module').then(
            (m) => m.ProductsModule
          ),
      },
      {
        path: 'category/:slug',
        loadComponent: () =>
          import(
            '../features/categories/components/category-details/category-details.component'
          ).then((m) => m.CategoryDetailsComponent),
      },
      {
        path: 'shopcart',
        loadChildren: () =>
          import('../features/shopcart/shopcart.module').then(
            (m) => m.ShopcartModule
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'user/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
