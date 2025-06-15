import { Component, computed, effect, OnInit } from '@angular/core';
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
})
export class ShopcartComponent implements OnInit {
  // Temporal (debe ser con el servicio de shopcart)
  productsSignal = toSignal(this.store.select(selectAllProducts), {
    initialValue: [],
  });
  loadingSignal = toSignal(this.store.select(selectLoading), {
    initialValue: false,
  });
  errorSignal = toSignal(this.store.select(selectError), {
    initialValue: null,
  });

  
  summaryShopping!: SummaryShopping;
  totalPrice: any;

  steps: number = 3;
  step: number = 1;

  constructor(public productsService: ProductsService, private store: Store) {}

  async ngOnInit() {
    this.store.dispatch(loadProducts());
  }

  changeStep(newStep: number) {
    this.step = newStep;    
  }

  // Prepare the information for the component that displays the cart summary
  readonly updateSummaryEffect = effect(() => {
    const products = this.productsSignal();
    if (products.length > 0) {
      const totalPrice = products.reduce((total, p) => total + p.price, 0);

      this.summaryShopping = {
        numberOfProducts: products.length,
        totalPrice,
      };
    }
  });
}
