import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ProductsService } from '../../../../features/products/services/products.service';
import { SkeletonComponent } from '../../skeleton/skeleton.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { DOCUMENT, isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { TimeRemainingPipe } from '../../../pipes/time-remaining.pipe';

@Component({
  selector: 'app-slider-products',
  templateUrl: './products-slider.component.html',
  styleUrl: './products-slider.component.scss',
  standalone: true,
  imports: [
    SkeletonComponent,
    ProductCardComponent,
    NgIf,
    NgFor,
    TimeRemainingPipe,
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
  @Input() typeSlider: 'default' | 'flash-sale' = 'default';
  @ViewChild('slider') slider!: ElementRef<HTMLElement>;
  currentIndex: number = 0;
  isAtStart: boolean = true;
  isAtEnd: boolean = false;

  //Time example flash sale
  timeFlashSale = 30000;
  private intervalId: any;
  isBrowser: boolean;

  constructor(
    public productsService: ProductsService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser && this.typeSlider === 'flash-sale') {
      this.startCountdown();
    }
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
      return 1; // móvil
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
