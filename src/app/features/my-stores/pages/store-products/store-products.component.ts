import { Component, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectStoreProducts,
  selectStoreProductsLoading,
  selectStoreProductsTotalCount,
  selectSelectedStore,
} from '../../store/my-stores.selectors';
import * as MyStoresActions from '../../store/my-stores.actions';
import { StoreProduct, ProductStatus } from '../../models/my-stores.model';

interface ProductTab {
  label: string;
  value: ProductStatus | 'all';
}

@Component({
  standalone: false,
  selector: 'app-store-products',
  templateUrl: './store-products.component.html',
  styleUrls: ['./store-products.component.scss'],
})
export class StoreProductsComponent implements OnInit {
  products$ = this.store.select(selectStoreProducts);
  loading$ = this.store.select(selectStoreProductsLoading);
  totalCount$ = this.store.select(selectStoreProductsTotalCount);
  selectedStore$ = this.store.select(selectSelectedStore);

  activeTab = signal<ProductStatus | 'all'>('all');
  searchQuery = signal('');

  tabs: ProductTab[] = [
    { label: 'Todos', value: 'all' },
    { label: 'Activos', value: 'active' },
    { label: 'Borrador', value: 'draft' },
    { label: 'Archivados', value: 'archived' },
  ];

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.selectedStore$.subscribe((currentStore) => {
      if (currentStore) {
        this.store.dispatch(MyStoresActions.loadStoreProducts({ storeId: currentStore.id }));
      }
    });
  }

  setTab(tab: ProductStatus | 'all'): void {
    this.activeTab.set(tab);
  }

  onSearch(query: string): void {
    this.searchQuery.set(query);
  }

  getStatusLabel(status: ProductStatus): string {
    const labels: Record<ProductStatus, string> = {
      active: 'Activo',
      draft: 'Borrador',
      archived: 'Archivado',
    };
    return labels[status];
  }

  addProduct(): void {
    const storeSlug = this.route.parent?.snapshot.paramMap.get('storeSlug');
    this.router.navigate(['/my-stores', storeSlug, 'products', 'new']);
  }

  editProduct(product: StoreProduct): void {
    const storeSlug = this.route.parent?.snapshot.paramMap.get('storeSlug');
    this.router.navigate(['/my-stores', storeSlug, 'products', product.id]);
  }

  deleteProduct(product: StoreProduct): void {
    this.selectedStore$.subscribe((currentStore) => {
      if (currentStore) {
        this.store.dispatch(
          MyStoresActions.deleteStoreProduct({ storeId: currentStore.id, productId: product.id }),
        );
      }
    });
  }
}
