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
import { ProductsService } from '../../../../features/products/services/products.service';
import { environment } from '../../../../../environments/environment';
import { ThemeService } from '../../../services/theme.service';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  selectAllProducts,
  selectError,
  selectLoading,
} from '../../../../features/products/store/selectors/product.selectors';
import { loadProducts } from '../../../../features/products/store/actions/product.actions';
import { NetworkService } from '../../../services/network.service';
import { UtilsService } from '../../../services/utils.service';
import { ButtonComponent } from '../../button/button.component';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { SkeletonComponent } from '../../skeleton/skeleton.component';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrl: './products-grid.component.scss',
  standalone: true,
  imports: [ButtonComponent, SkeletonComponent, ProductCardComponent, NgIf, NgClass, NgStyle, NgFor],
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

  // @ViewChildren('productCard') productCards!: QueryList<ElementRef>;
  async ngOnInit() {
    this.themeService.darkMode$.subscribe((isDark) => {
      this.isDark = isDark;
    });
  }

  ngAfterViewInit() {
    // this.observer = this.utilsService.parallaxEffect(this.productCards, 0.05);
  }

  get isDisabled(): boolean {
    return this.loading || !this.isOffline || this.isEmptyList === 0;
  }

  get isOffline(): boolean {
    return !this.isOnline();
  }
  get isEmptyList() {
    return this.products.length;
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  addMore() {
    this.products = this.products.concat(this.products);
  }

  detailProduct(product: any) {
    this.router.navigate([`/product/${product.slug}`]);
  }
}
