import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CardProductComponent } from '../card-product/card-product.component';
import { UtilsService } from '../../../../shared/services/utils.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-slider-products',
  templateUrl: './slider-products.component.html',
  styleUrl: './slider-products.component.scss',
  standalone: false,
})
export class SliderProductsComponent implements OnInit {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() margintop: string = '';
  @Input() loading: boolean = true;
  @Input() products: any[] = [];
  @ViewChild('slider') slider!: ElementRef<HTMLElement>;
  currentIndex: number = 0;

  constructor(
    public productsService: ProductsService
  ) {}

  async ngOnInit() {}

  scrollSlider(direction: 'left' | 'right'): void {
    const scrollAmount = 300;
    console.log(scrollAmount);
    const directionObject: ScrollToOptions = {
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    };

    this.slider.nativeElement.scrollBy(directionObject);
  }
}
