import {
  Component,
  computed,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Signal,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ProductsService } from '../../../../features/products/services/products.service';
import { SkeletonComponent } from '../../skeleton/skeleton.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import {
  DOCUMENT,
  isPlatformBrowser,
  NgFor,
  NgIf,
  NgSwitch,
  NgSwitchCase,
} from '@angular/common';
import { TimeRemainingPipe } from '../../../pipes/time-remaining.pipe';
import { ButtonComponent } from '../../ui/button/button.component';
import { sliderType } from './products-slider-type.enum';
import { NetworkService } from '../../../services/network.service';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-slider-products',
  templateUrl: './products-slider.component.html',
  styleUrl: './products-slider.component.scss',
  standalone: true,
  imports: [
    SkeletonComponent,
    ProductCardComponent,
    ButtonComponent,
    TimeRemainingPipe,
    NgIf,
    NgFor,
    NgSwitch,
    NgSwitchCase,
  ],
})
export class ProductsSliderComponent implements OnInit, OnDestroy, OnChanges {
  // Header variables
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() customStyles: { [key: string]: string } = {};

  // Data variables
  @Input() loading: boolean = true;
  @Input() products: any[] = [];

  // Slider variables
  @ViewChild('slider') slider!: ElementRef<HTMLElement>;
  @Input() typeSlider: sliderType = sliderType.default;
  
  
  sliderType = sliderType;

  
  currentIndex: number = 0;
  isAtStart: boolean = true;
  isAtEnd: boolean = false;

  //Time example flash sale
  timeFlashSale = 30000;
  
  
  private intervalId: any;
  isBrowser: boolean;

  isOnline!: Signal<boolean>;
  isDark!: Signal<boolean>;

  constructor(
    public productsService: ProductsService,
    private networkService: NetworkService,
    private themeService: ThemeService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser && this.typeSlider === 'flash-sale') {
      this.startCountdown();
    }
    this.isDark = this.themeService.darkModeSignal;
    this.isOnline = computed(() => this.networkService.isOnline());
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.isBrowser &&
      changes['typeSlider']?.currentValue === 'flash-sale'
    ) {
      this.startCountdown();
    }
  }

  get isloading(): boolean {
    return this.loading || !this.isOnline() || this.isEmptyList;
  }

  get isEmptyList() {
    return this.products.length === 0;
  }

  scrollSlider(direction: 'left' | 'right'): void {
    const productElement = this.slider.nativeElement.querySelector(
      '.product'
    ) as HTMLElement;
    if (!productElement) return;
    const cardsPerView = this.getCardsPerView();
    const cardWidth = productElement.offsetWidth;
    const scrollAmount = cardWidth * cardsPerView;

    this.slider.nativeElement.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });

    setTimeout(() => this.checkScrollPosition(), 300);
  }

  getCardsPerView(): number {
    const width = window.innerWidth;
    if (width < 768) {
      return 2; // móvil
    } else if (width < 1024) {
      return 2; // tablet
    } else {
      return 4; // desktop
    }
  }

  checkScrollPosition(): void {
    const el = this.slider.nativeElement;
    this.isAtStart = el.scrollLeft === 0;
    this.isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
  }

  private startCountdown(): void {
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      if (this.timeFlashSale > 0) {
        this.timeFlashSale--;
      } else {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }
}
