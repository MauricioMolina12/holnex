import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Ad } from '../../shared/models/ads';
import { ProductsService } from '../../shared/components/products/products.service';
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
  constructor(
    public productsService: ProductsService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.getAllProducts();
  }

  private suscriptionProducts!: Subscription;
  getAllProducts(): void {
     this.suscriptionProducts = this.productsService.getProducts().subscribe((products) => {
      if (products) {
        this.productsService.products = products;
      }

      // Se debe organizar bien la paginación
      // this.productsService.pagination.currentProducts = products;

      // this.productsService.pagination.totalPages = Math.ceil(products.length / this.productsService.pagination.productPerPage);

      // this.productsService.pagination.hasPagination = this.productsService.pagination.totalPages > 1;

      // this.productsService.paginatedProducts(1,this.productsService.pagination.productPerPage,this.productsService.pagination.currentProducts);
    });
  }

  
  ngOnDestroy(): void {
    if(this.suscriptionProducts){
      this.suscriptionProducts.unsubscribe()
    }
  }

  detailProduct(product: any) {
    this.router.navigate([`/product/${product.id}`]);
    this.productsService.productDetail = product;
  }
}
