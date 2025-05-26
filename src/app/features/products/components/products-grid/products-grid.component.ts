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
  OnInit,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { environment } from '../../../../../environments/environment';
import { ThemeService } from '../../../../shared/services/theme.service';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  selectAllProducts,
  selectError,
  selectLoading,
} from '../../store/selectors/product.selectors';
import { loadProducts } from '../../store/actions/product.actions';
import { NetworkService } from '../../../../shared/services/network.service';
import { UtilsService } from '../../../../shared/services/utils.service';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrl: './products-grid.component.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // imports: [
  //   RouterModule,
  //   CommonModule,
  //   NgStyle,
  //   NgFor,
  //   FiltersComponent,
  //   CardProductComponent,
  // ],
})
export class ProductsGridComponent implements OnInit {
  @Input() products: any[] = []; // => Array products
  @Input() loading: boolean = true;
  @Input() width: string = '100vw'; // => Width main wrapper for mobile size
  @Input() isfullWidth!: boolean; // True => Container envelope will have a width of 100vw otherwise the one you pass through the "width" prop
  @Input() height: string = ''; // => Height main wrapper
  @Input() margin: string = ''; // => Margin main wrapper
  @Input() padding: string = ''; // => Padding main wrapper

  @Input() title: string = ''; // Title for current section
  @Input() subtitle: string = ''; // Subtitle for current section
  @Input() hasHeader: boolean = true; // => Determines if the component should have a header
  @Input() labelButton: string = '';

  pages: number[] = [];
  isDark: boolean = false;
  isOnline = this.networkService.isOnline;

  private observer!: any;

  constructor(
    public productsService: ProductsService,
    private router: Router,
    private themeService: ThemeService,
    private networkService: NetworkService,
    private utilsService: UtilsService
  ) {}

  @ViewChildren('productCard') productCards!: QueryList<ElementRef>;
  async ngOnInit() {
    this.themeService.darkMode$.subscribe((isDark) => {
      this.isDark = isDark;
    });
  }
  
  
  get isDisabled(): boolean {
    return this.loading || !this.isOnline();
  }

  ngAfterViewInit() {
    this.observer = this.utilsService.parallaxEffect(this.productCards, 0.05);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  addMore() {
    this.products = this.products.concat(this.products);
  }

  // addShoppingCart(e: Event) {
  //   e.stopPropagation();
  //   const shopCartIcon = this.elRef.nativeElement.querySelector(
  //     '.product-add-cart-shop-icon'
  //   );
  //   if (shopCartIcon) {
  //     this.renderer.addClass(shopCartIcon, 'add');
  //     shopCartIcon.addEventListener(
  //       'animationend',
  //       () => {
  //         this.renderer.removeClass(shopCartIcon, 'add');
  //       },
  //       { once: true }
  //     );
  //   }
  // }

  detailProduct(product: any) {
    this.router.navigate([`/product/${product.slug}`]);
  }
}
