import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  computed,
  Signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../../../features/products/services/products.service';
import { ThemeService } from '../../../../core/services/theme.service';
import { NetworkService } from '../../../../core/services/network.service';
import { ButtonComponent } from '../../ui/button/button.component';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { SkeletonComponent } from '../../../../core/components/skeleton/skeleton.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../../../features/products/models/products.model';
import { skeletonType } from '../../../../core/components/skeleton/skeleton.type.enum';
import { StatusUiMessageComponent } from '../../../../core/components/status-ui-message/status-ui-message.component';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrl: './products-grid.component.scss',
  standalone: true,
  imports: [
    ButtonComponent,
    SkeletonComponent,
    ProductCardComponent,
    StatusUiMessageComponent,
    NgIf,
    NgClass,
    NgStyle,
    NgFor,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsGridComponent implements OnInit {
  @Input() products: Product[] = []; // => Array products
  @Input() loading: boolean = true;
  @Input() error: string | null = '';

  @Input() width: string = '100vw'; // => Width main wrapper for mobile size
  @Input() isfullWidth!: boolean; // True => Container envelope will have a width of 100vw otherwise the one you pass through the "width" prop
  @Input() height: string = ''; // => Height main wrapper
  @Input() margin: string = ''; // => Margin main wrapper
  @Input() padding: string = ''; // => Padding main wrapper

  @Input() title: string = ''; // Title for current section
  @Input() subtitle: string = ''; // Subtitle for current section
  @Input() hasHeader: boolean = true; // => Determines if the component should have a header
  @Input() labelButton: string = '';

  isDark!: Signal<boolean>;
  isOnline!: Signal<boolean>;
  loadingAction: boolean = false;

  // Enums
  SkeletonTypeEnum = skeletonType;

  constructor(
    public productsService: ProductsService,
    private router: Router,
    private themeService: ThemeService,
    private networkService: NetworkService
  ) {}

  async ngOnInit() {
    this.isDark = this.themeService.darkModeSignal;
    this.isOnline = computed(() => this.networkService.isOnline());
  }

  get visibleProducts(): Product[] {
    return this.products.slice(1, 9);
  }

  get showProducts(): boolean {
    return !this.loading && !this.isEmptyList && !this.error;
  }

  get showSkeleton(): boolean {
    return this.loading && this.isOnline();
  }

  get showError(): boolean {
    return !this.loading && (!!this.error || !this.isOnline());
  }

  get showEmpty(): boolean {
    return !this.loading && !this.error && this.isEmptyList;
  }

  get isEmptyList() {
    return this.products.length === 0;
  }

  addMore() {
    this.loadingAction = true;

    setTimeout(() => {
      const moreProducts = [...this.products];
      this.products = this.products.concat(moreProducts);
      this.loadingAction = false;
    }, 1000);
  }

  detailProduct(product: any) {
    this.router.navigate([`/product/${product.slug}`]);
  }
}
