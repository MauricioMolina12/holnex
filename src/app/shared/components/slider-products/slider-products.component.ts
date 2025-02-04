import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardProductComponent } from '../card-product/card-product.component';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-slider-products',
  templateUrl: './slider-products.component.html',
  styleUrl: './slider-products.component.scss',
  standalone: true,
  imports: [NgStyle, CardProductComponent, NgFor],
})
export class SliderProductsComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() margintop: string = '';
  @Input() products: any[] = [];
  currentIndex: number = 0;

  constructor(private utilsService: UtilsService) {}

  goToPrevious() {
    this.currentIndex = this.utilsService.goToPrevious(
      this.currentIndex,
      this.products
    );
  }

  goToNext() {
    this.currentIndex = this.utilsService.goToNext(
      this.currentIndex,
      this.products
    );
  }

  goToPage(index: number) {
    this.currentIndex = this.utilsService.goToPage(index);
  }
}
