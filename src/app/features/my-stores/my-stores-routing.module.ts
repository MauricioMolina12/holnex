import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { storeRedirectGuard } from './guards/store-redirect.guard';
import { storeExistsGuard } from './guards/store-exists.guard';
import { StoreSelectorComponent } from './pages/store-selector/store-selector.component';
import { StoreLayoutComponent } from './components/store-layout/store-layout.component';
import { StoreHomeComponent } from './pages/store-home/store-home.component';
import { StoreProductsComponent } from './pages/store-products/store-products.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { StorePlaceholderComponent } from './pages/store-placeholder/store-placeholder.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [storeRedirectGuard],
    component: StoreSelectorComponent,
  },
  {
    path: ':storeSlug',
    component: StoreLayoutComponent,
    children: [
      { path: '', component: StoreHomeComponent },
      { path: 'products', component: StoreProductsComponent },
      { path: 'products/new', component: ProductFormComponent },
      { path: 'products/collections', component: StorePlaceholderComponent, data: { sectionName: 'Colecciones' } },
      { path: 'products/inventory', component: StorePlaceholderComponent, data: { sectionName: 'Inventario' } },
      { path: 'products/:productId', component: ProductFormComponent },
      { path: 'orders', component: StorePlaceholderComponent, data: { sectionName: 'Pedidos' } },
      { path: 'customers', component: StorePlaceholderComponent, data: { sectionName: 'Clientes' } },
      { path: 'content', component: StorePlaceholderComponent, data: { sectionName: 'Contenido' } },
      { path: 'finances', component: StorePlaceholderComponent, data: { sectionName: 'Finanzas' } },
      { path: 'analytics', component: StorePlaceholderComponent, data: { sectionName: 'Analíticas' } },
      { path: 'marketing', component: StorePlaceholderComponent, data: { sectionName: 'Marketing' } },
      { path: 'discounts', component: StorePlaceholderComponent, data: { sectionName: 'Descuentos' } },
      { path: 'settings', component: StorePlaceholderComponent, data: { sectionName: 'Configuración' } },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyStoresRoutingModule {}
