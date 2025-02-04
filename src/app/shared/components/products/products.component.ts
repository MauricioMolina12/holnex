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
  ViewChildren,
  QueryList,
  OnDestroy,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Product } from '../../models/products';
import { ProductsService } from './products.service';
import { environment } from '../../../../environments/environment';
import { FiltersComponent } from '../filters/filters.component';
import { CardProductComponent } from '../card-product/card-product.component';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NgStyle,
    NgFor,
    FiltersComponent,
    CardProductComponent,
  ],
})
export class ProductsComponent implements OnDestroy {
  @Input() products: any[] = []; // => Array products
  @Input() hasPagination: boolean = true; // => Determines if the component should have pagination
  @Input() productPerPage: number = 8; // => Products per page
  @Input() currentPage: number = 1; // => Current page the user views
  @Input() totalPages: number = 1; // => Total pages of the pagination

  @Input() filters: { [key: string]: any } = {};
  @Input() category: string = '';
  @Input() offerType: string = '';

  @Input() width: string = '100vw'; // => Width main wrapper for mobile size
  @Input() isfullWidth!: boolean; // True => Container envelope will have a width of 100vw otherwise the one you pass through the "width" prop
  @Input() height: string = ''; // => Height main wrapper
  @Input() margin: string = ''; // => Margin main wrapper
  @Input() padding: string = ''; // => Padding main wrapper

  @Input() title: string = ''; // Title for current section
  @Input() subtitle: string = ''; // Subtitle for current section


  
  
  product: any;
  currentProducts: any[] = []; // => auxiliary array
  private observer!: any;

  constructor(
    public productsService: ProductsService,
    private renderer: Renderer2,
    private elRef: ElementRef,
    private router: Router,
    private utilsService: UtilsService
  ) {}


  @ViewChildren('productCard') productCards!: QueryList<ElementRef>;


  ngAfterViewInit() {
    this.observer = this.utilsService.parallaxEffect(this.productCards, 0.05)
  }

  ngOnDestroy(): void {
    if(this.observer){
      this.observer.disconnect();
    }
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

  // scrollToContainer(id: string) {
  //   const element = document.getElementById(id);
  //   if (element) {
  //     element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   }
  // }

  detailProduct(product: any) {
    this.router.navigate([`/product/${product.id}`]);
    this.productsService.product_detail = product;
  }
}
