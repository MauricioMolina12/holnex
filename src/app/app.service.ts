import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProducts } from './features/products/store/actions/product.actions';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private store: Store) {}

  startApp() {
    this.store.dispatch(loadProducts());
  }
}
