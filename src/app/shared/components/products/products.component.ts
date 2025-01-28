import { CommonModule, NgFor, NgStyle } from '@angular/common';
import {
  Component,
  ElementRef,
  Renderer2,
  EventEmitter,
  Input,
  Output,
  HostListener,
  ViewChild,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Product } from '../../models/products';
import { ProductsService } from './products.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  standalone: true,
  imports: [RouterModule, CommonModule, NgStyle, NgFor],
})
export class ProductsComponent {


  // Props
  @Input() products: any[] = []; // => Array products
  @Input() filters: { [key: string]: any } = {};
  @Input() category: string = '';
  @Input() offerType: string = '';

  @Input() hasPagination: boolean = true; // => Determines if the component should have pagination
  @Input() productPerPage: number = 8; // => Products per page
  @Input() totalPages: number = 1; // => Total pages of the pagination
  @Input() currentPage: number = 1; // => Current page the user views

  // Events
  @Output() productClick = new EventEmitter<Product>(); // => Event to see the detailed
  product: any;

  currentProducts: any[] = []; // => auxiliary array

  constructor(
    public productsService: ProductsService,
    private renderer: Renderer2,
    private elRef: ElementRef,
    private router: Router
  ) {}

  ngOnInit(): void {
  }


  movePage(type: string, page?: number): void {
    if (page === undefined) page = 1;
    switch (type) {
      case 'indexpage':
        if (page >= 1 && page <= this.productsService.pagination.totalPages) {
          this.productsService.pagination.currentPage = page;
        }
        break;
      case 'prevpage':
        if (this.productsService.pagination.currentPage > 1) {
          this.productsService.pagination.currentPage--;
        }
        break;
      case 'nextpage':
        if (
          this.productsService.pagination.currentPage <
          this.productsService.pagination.totalPages
        ) {
          this.productsService.pagination.currentPage++;
        }
        break;
    }

    this.productsService.paginatedProducts(
      this.productsService.pagination.currentPage,
      this.productsService.pagination.productPerPage,
      this.productsService.pagination.currentProducts
    );
  }

  addShoppingCart(e: Event) {
    e.stopPropagation();
    const shopCartIcon = this.elRef.nativeElement.querySelector(
      '.product-add-cart-shop-icon'
    );
    if (shopCartIcon) {
      this.renderer.addClass(shopCartIcon, 'add');
      shopCartIcon.addEventListener(
        'animationend',
        () => {
          this.renderer.removeClass(shopCartIcon, 'add');
        },
        { once: true }
      );
    }
  }

  detailProduct(product: any){
    this.router.navigate([`/product/${product.id}`])
    this.productsService.product_detail = product;
  }
}
