import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  selectAllProducts,
  selectError,
  selectLoading,
} from '../products/store/selectors/product.selectors';
import { ProductsService } from '../products/services/products.service';
import { Store } from '@ngrx/store';
import { loadProducts } from '../products/store/actions/product.actions';
import { SummaryShopping } from './models/summary-shopping';

@Component({
  selector: 'app-shopcart',
  templateUrl: './shopcart.component.html',
  styleUrl: './shopcart.component.scss',
  standalone: false,
})
export class ShopcartComponent implements OnInit {
  
  // Store signals
  products = toSignal(this.store.select(selectAllProducts), { initialValue: [] });
  loadingSignal = toSignal(this.store.select(selectLoading), { initialValue: false });
  errorSignal = toSignal(this.store.select(selectError), { initialValue: null });

  productsRelated = toSignal(this.store.select(selectAllProducts), { initialValue: [] });
  loadingProductsRelated = toSignal(this.store.select(selectLoading), { initialValue: false });
  errorProductsRelated = toSignal(this.store.select(selectError), { initialValue: null });

  // Local cart state
  removedIds = signal<Set<number>>(new Set());
  selectedIds = signal<Set<number>>(new Set());

  cartProducts = computed(() =>
    this.products().slice(0, 3).filter((p) => !this.removedIds().has(p.id))
  );

  allSelected = computed(() => {
    const prods = this.cartProducts();
    return prods.length > 0 && prods.every((p) => this.selectedIds().has(p.id));
  });

  selectedCount = computed(() => this.selectedIds().size);

  summaryShopping!: SummaryShopping;

  steps: number = 3;
  step: number = 1;

  constructor(public productsService: ProductsService, private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadProducts());
  }

  // Selection
  isSelected(id: number): boolean {
    return this.selectedIds().has(id);
  }

  toggleSelect(id: number, selected: boolean) {
    const next = new Set(this.selectedIds());
    selected ? next.add(id) : next.delete(id);
    this.selectedIds.set(next);
  }

  toggleSelectAll() {
    if (this.allSelected()) {
      this.selectedIds.set(new Set());
    } else {
      this.selectedIds.set(new Set(this.cartProducts().map((p) => p.id)));
    }
  }

  // Cart actions
  onRemoveItem(id: number) {
    const removed = new Set(this.removedIds());
    removed.add(id);
    this.removedIds.set(removed);
    const sel = new Set(this.selectedIds());
    sel.delete(id);
    this.selectedIds.set(sel);
  }

  removeSelected() {
    const removed = new Set(this.removedIds());
    this.selectedIds().forEach((id) => removed.add(id));
    this.removedIds.set(removed);
    this.selectedIds.set(new Set());
  }

  clearCart() {
    this.removedIds.set(new Set(this.cartProducts().map((p) => p.id)));
    this.selectedIds.set(new Set());
  }

  onSaveForLater(product: any) {
    this.onRemoveItem(product.id);
  }

  changeStep(newStep: number) {
    this.step = newStep;
  }

  onToggleStep(stepIndex: number): void {
    this.step = this.step === stepIndex ? -1 : stepIndex;
  }

  readonly updateSummaryEffect = effect(() => {
    const products = this.cartProducts();
    const totalPrice = products.reduce((total, p) => total + p.price, 0);
    this.summaryShopping = { numberOfProducts: products.length, totalPrice };
  });
}
