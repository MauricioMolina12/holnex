import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Ad } from '../../shared/models/ads';
import { ProductsService } from '../../shared/components/products/products.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(
    public productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }
  

  getAllProducts(): void {
    this.productsService.getProducts().subscribe((products) => {
      this.productsService.pagination.currentProducts = products;
      this.productsService.pagination.totalPages = Math.ceil(
        products.length / this.productsService.pagination.productPerPage
      );
      this.productsService.pagination.hasPagination =
        this.productsService.pagination.totalPages > 1;
      this.productsService.paginatedProducts(
        this.productsService.pagination.currentPage,
        this.productsService.pagination.productPerPage,
        this.productsService.pagination.currentProducts
      );
    });
  }

  detailProduct(product: any) {
    this.router.navigate([`/product/${product.id}`]);
    this.productsService.product_detail = product;
  }
}
