import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
  @Input() products: any[] = [];
  currentIndex: number = 0;

  constructor(
    private utilsService: UtilsService,
    public productsService: ProductsService
  ) {}

  async ngOnInit() {
  }

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
