import { Component, Inject, OnInit, PLATFORM_ID, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs';
import { selectSelectedStore, selectAllStores } from '../../store/my-stores.selectors';
import * as MyStoresActions from '../../store/my-stores.actions';
import { StoreSidebarItem, Store as StoreModel } from '../../models/my-stores.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { getInitials } from '../../../../utils/functions';

@Component({
  standalone: false,
  selector: 'app-store-layout',
  templateUrl: './store-layout.component.html',
  styleUrls: ['./store-layout.component.scss'],
})
export class StoreLayoutComponent implements OnInit {
  selectedStore$ = toSignal(this.store.select(selectSelectedStore));
  stores$ = toSignal(this.store.select(selectAllStores));

  getInitials = getInitials;
  sidebarCollapsed = signal(false);

  sidebarItems: StoreSidebarItem[] = [
    { label: 'Inicio', icon: 'icon-home', route: '' },
    {
      label: 'Productos',
      icon: 'icon-box',
      route: 'products',
      children: [
        { label: 'Colecciones', icon: '', route: 'collections' },
        { label: 'Inventario', icon: '', route: 'inventory' },
      ],
    },
    { label: 'Pedidos', icon: 'icon-shopping_bag_speed', route: 'orders' },
    { label: 'Clientes', icon: 'icon-person', route: 'customers' },
    {
      label: 'Finanzas',
      icon: 'icon-request_quote',
      route: 'finances',
    },
    {
      label: 'Analíticas',
      icon: 'icon-finance_mode',
      route: 'analytics',
    },
    {
      label: 'Marketing',
      icon: 'icon-campaign',
      route: 'marketing',
    },
    { label: 'Descuentos', icon: 'icon-discount', route: 'discounts' },
  ];

  settingsItem: StoreSidebarItem = {
    label: 'Configuración',
    icon: 'icon-settings',
    route: 'settings',
  };

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    // if (!isPlatformBrowser(this.platformId)) return;
    
    
    const slug = this.route.snapshot.paramMap.get('storeSlug');
    if (slug) {
      this.store
        .select(selectAllStores)
        .pipe(
          filter((stores) => stores.length > 0),
          take(1),
        )
        .subscribe((stores) => {
          console.log("Stores: ", stores);
          
          const found = stores.find((s) => s.slug === slug);
          if (found) {
            this.store.dispatch(MyStoresActions.selectStore({ storeId: found.id }));
          } else {
            this.router.navigate(['/my-stores']);
          }
        });
    }
  }

  toggleSidebar(): void {
    this.sidebarCollapsed.update((v) => !v);
  }

  onSidebarMouseEnter(): void {
    this.sidebarCollapsed.set(false);
  }

  toggleSubMenu(item: StoreSidebarItem): void {
    item.expanded = !item.expanded;
  }

  navigateTo(item: StoreSidebarItem): void {
    const storeSlug = this.route.snapshot.paramMap.get('storeSlug');
    if (item.children?.length) {
      this.toggleSubMenu(item);
      return;
    }
    this.router.navigate(['/my-stores', storeSlug, item.route]);
  }

  navigateToChild(parent: StoreSidebarItem, child: StoreSidebarItem): void {
    const storeSlug = this.route.snapshot.paramMap.get('storeSlug');
    this.router.navigate(['/my-stores', storeSlug, parent.route, child.route]);
  }

  switchStore(): void {
    this.router.navigate(['/my-stores']);
  }

  isActive(route: string): boolean {
    const storeSlug = this.route.snapshot.paramMap.get('storeSlug');
    const currentUrl = this.router.url;
    const target = `/my-stores/${storeSlug}/${route}`;
    return route === ''
      ? currentUrl === `/my-stores/${storeSlug}` || currentUrl === `/my-stores/${storeSlug}/`
      : currentUrl.startsWith(target);
  }
}
