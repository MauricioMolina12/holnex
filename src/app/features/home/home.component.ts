import {
  ChangeDetectionStrategy,
  Component,
  computed,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Ad } from '../../shared/models/ads';
import { ProductsService } from '../products/services/products.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadProducts } from '../products/store/actions/product.actions';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectAllProducts, selectError, selectLoading } from '../products/store/selectors/product.selectors';
import { NetworkService } from '../../shared/services/network.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {


  productsSignal = toSignal(this.store.select(selectAllProducts), { initialValue: [] });
  loadingSignal = toSignal(this.store.select(selectLoading), { initialValue: false});
  errorSignal = toSignal(this.store.select(selectError), { initialValue: null });
  

  private suscriptionProducts!: Subscription;

  constructor(
    public productsService: ProductsService,
    private store: Store
  ) {}

  async ngOnInit() {
    this.store.dispatch(loadProducts());
  }

  ngOnDestroy(): void {
    if (this.suscriptionProducts) {
      this.suscriptionProducts.unsubscribe();
    }
  }

}
