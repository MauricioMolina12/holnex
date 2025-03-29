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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {


  products = computed(() => this.productsService.products());
  loadingProducts = computed(() => !this.products() || this.products().length === 0);
  
  private suscriptionProducts!: Subscription;

  constructor(
    public productsService: ProductsService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.productsService.getAllProducts();
  }

  ngOnDestroy(): void {
    if (this.suscriptionProducts) {
      this.suscriptionProducts.unsubscribe();
    }
  }

  detailProduct(product: any) {
    console.log(product);
    // this.router.navigate([`/product/${product?.slug}`]);
    // this.productsService.prosductDetail.set(product);
  }
}
