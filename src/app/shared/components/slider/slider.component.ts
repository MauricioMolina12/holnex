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
import { sliderType } from '../products/products-slider/products-slider-type.enum';
import { skeletonType } from '../../../core/components/skeleton/skeleton.type.enum';
import { NetworkService } from '../../../core/services/network.service';
import { ThemeService } from '../../../core/services/theme.service';
import { DOCUMENT, isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { ButtonComponent } from '../ui/button/button.component';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  standalone: true,
  imports: [NgIf, ButtonComponent],
})
export class SliderComponent implements OnInit, OnDestroy {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() customStyles: { [key: string]: string } = {};
  @Input() labelButton: string = '';
  @Input() itemSelector = '[slider-item]';
  @Input() itemsPerViewConfig: { [key: string]: number } = {
    mobile: 1,
    tablet: 2,
    desktop: 4,
  };

  // Data variables
  @Input() loading: boolean = true;
  @Input() error: string | null = '';
  @Input() data: any[] = [];

  // Slider variables
  @ViewChild('slider') slider!: ElementRef<HTMLElement>;
  @Input() typeSlider: sliderType = sliderType.default;
  sliderType = sliderType;
  currentIndex: number = 0;
  isAtStart: boolean = true;
  isAtEnd: boolean = false;


  isOnline!: Signal<boolean>;
  isDark!: Signal<boolean>;

  // Enums
  SkeletonTypeEnum = skeletonType;

  constructor(
    private networkService: NetworkService,
    private themeService: ThemeService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngOnInit() {
    this.isDark = this.themeService.darkModeSignal;
    this.isOnline = computed(() => this.networkService.isOnline());
  }

  ngOnDestroy(): void {}


  get showData(): boolean {
    return !this.loading && this.isOnline() && !this.error;
  }

  get isloading(): boolean {
    return this.loading && !this.error;
  }

  get isEmptyList() {
    return this.data.length === 0;
  }

  get visibleData() {
    return this.data;
  }

  scrollSlider(direction: 'left' | 'right'): void {
    const itemElement = this.slider.nativeElement.querySelector(
      this.itemSelector
    ) as HTMLElement;
    console.log(itemElement);
    
    if (!itemElement) return;
    const cardsPerView = this.getCardsPerView();
    const cardWidth = itemElement.offsetWidth;
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
      return this.itemsPerViewConfig['mobile'];
    } else if (width < 1024) {
      return this.itemsPerViewConfig['tablet'];
    } else {
      return this.itemsPerViewConfig['desktop'];
    }
  }

  checkScrollPosition(): void {
    const el = this.slider.nativeElement;
    this.isAtStart = el.scrollLeft === 0;
    this.isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
  }
}
