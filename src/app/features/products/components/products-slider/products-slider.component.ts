import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-slider-products',
  templateUrl: './products-slider.component.html',
  styleUrl: './products-slider.component.scss',
  standalone: false,
})
export class ProductsSliderComponent implements OnInit {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() customStyles: { [key: string]: string } = {};

  @Input() loading: boolean = true;
  @Input() products: any[] = [];
  @ViewChild('slider') slider!: ElementRef<HTMLElement>;
  currentIndex: number = 0;
  isAtStart: boolean = true;
  isAtEnd: boolean = false;

  constructor(public productsService: ProductsService) {}

  async ngOnInit() {}

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
}
