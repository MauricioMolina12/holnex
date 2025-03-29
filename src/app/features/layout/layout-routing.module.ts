import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ProductDetailsComponent } from '../products/components/product-details/product-details.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../home/home.module').then(m=> m.HomeModule),
      },

      // Ruta ubicada temporalmente
      {
        path: 'product/:id',
        component: ProductDetailsComponent
      },
      {
        path: 'product',
        loadChildren: () => import('../products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'category/:slug',
        loadComponent: () => import('../categories/components/category-details/category-details.component').then(m => m.CategoryDetailsComponent)
      },
      {
        path: 'shopcart',
        loadChildren: () => import('../shopcart/shopcart.module').then(m => m.ShopcartModule)
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
