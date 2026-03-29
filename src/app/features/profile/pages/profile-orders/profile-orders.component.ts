import {
  ChangeDetectionStrategy,
  Component,
  computed,
  OnInit,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';
import { loadOrders } from '../../store/profile.actions';
import {
  selectOrdersLoaded,
  selectProfileLoading,
  selectProfileOrders,
} from '../../store/profile.selectors';
import { Order, OrderStatus } from '../../models/profile.model';

type FilterStatus = 'all' | OrderStatus;

@Component({
  selector: 'app-profile-orders',
  templateUrl: './profile-orders.component.html',
  styleUrl: './profile-orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ProfileOrdersComponent implements OnInit {
  allOrders = toSignal(this.store.select(selectProfileOrders), { initialValue: [] });
  loading   = toSignal(this.store.select(selectProfileLoading), { initialValue: false });

  activeFilter = signal<FilterStatus>('all');
  currentPage  = signal<number>(1);
  readonly pageSize = 3;

  readonly filters: { label: string; value: FilterStatus }[] = [
    { label: 'Todos',      value: 'all'        },
    { label: 'Pendiente',  value: 'pending'    },
    { label: 'En proceso', value: 'processing' },
    { label: 'Enviado',    value: 'shipped'    },
    { label: 'Entregado',  value: 'delivered'  },
    { label: 'Cancelado',  value: 'cancelled'  },
  ];

  filteredOrders = computed(() => {
    const f = this.activeFilter();
    const o = this.allOrders();
    return f === 'all' ? o : o.filter((order) => order.status === f);
  });

  paginatedOrders = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredOrders().slice(start, start + this.pageSize);
  });

  totalPages = computed(() =>
    Math.ceil(this.filteredOrders().length / this.pageSize)
  );

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectOrdersLoaded).pipe(take(1)).subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadOrders());
    });
  }

  setFilter(filter: FilterStatus): void {
    this.activeFilter.set(filter);
    this.currentPage.set(1);
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  onViewDetail(order: Order): void {
    console.log('View order:', order.id);
  }
}
