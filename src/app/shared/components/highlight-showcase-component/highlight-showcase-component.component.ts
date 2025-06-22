import {
  Component,
  computed,
  Input,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { ProductCardComponent } from '../products/product-card/product-card.component';
import { NgClass, NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { ShowcaseTypeEnum } from './highlight-showcase-type.enum';
import { ProductsService } from '../../../features/products/services/products.service';
import { ButtonComponent } from '../ui/button/button.component';
import { ThemeService } from '../../../core/services/theme.service';
import { NetworkService } from '../../../core/services/network.service';
import { skeletonType } from '../../../core/components/skeleton/skeleton.type.enum';
import { SkeletonComponent } from '../../../core/components/skeleton/skeleton.component';

@Component({
  selector: 'app-highlight-showcase-component',
  templateUrl: './highlight-showcase-component.component.html',
  styleUrl: './highlight-showcase-component.component.scss',
  standalone: true,
  imports: [
    ProductCardComponent,
    ButtonComponent,
    NgFor,
    NgSwitch,
    NgSwitchCase,
    NgClass,
    NgIf,
    SkeletonComponent,
  ],
})
export class HighlightShowcaseComponentComponent implements OnInit {
  constructor(
    public productsService: ProductsService,
    private themeService: ThemeService,
    private networkService: NetworkService
  ) {}

  @Input() typeShowcase: ShowcaseTypeEnum = ShowcaseTypeEnum.NewProducts;
  @Input() data: any[] = [];
  @Input() loading: boolean = true;
  @Input() error: string = '';
  @Input() orientation: 'left' | 'right' = 'left';
  @Input() labelButton: string = '';

  isDark!: Signal<boolean>;
  isOnline!: Signal<boolean>;
  SkeletonTypeEnum = skeletonType;
  skeletonArray = Array(8);

  ngOnInit(): void {
    this.isDark = this.themeService.darkModeSignal;
    this.isOnline = computed(() => this.networkService.isOnline());
  }

  get visibleData(){
    return this.data.slice(1, 9);
  }

  get showSkeleton(): boolean {
    return this.loading && !this.showError;
  }

  get showError(): boolean {
    return !this.loading && !!this.error;
  }

  get showEmpty(): boolean {
    return !this.loading && !this.error && this.isEmptyList;
  }

  get showData(): boolean {
    return !this.loading && !this.isEmptyList && !this.error;
  }

  get isEmptyList() {
    return this.data.length === 0;
  }

  ShowcaseTypeEnum = ShowcaseTypeEnum;
  readonly showcaseContent = {
    [ShowcaseTypeEnum.NewProducts]: {
      title: 'Nuevos productos',
    },
    [ShowcaseTypeEnum.TopSellers]: {
      title: 'Más vendidos',
    },
    [ShowcaseTypeEnum.CategoryOffers]: {
      title: 'Ofertas por categoría',
    },
  };
}
