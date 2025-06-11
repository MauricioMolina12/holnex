import { Component, Input, OnInit, signal } from '@angular/core';
import { ProductCardComponent } from '../products/product-card/product-card.component';
import { NgFor, NgSwitch, NgSwitchCase } from '@angular/common';
import { ShowcaseTypeEnum } from './highlight-showcase-type.enum';
import { ProductsService } from '../../../features/products/services/products.service';

@Component({
  selector: 'app-highlight-showcase-component',
  templateUrl: './highlight-showcase-component.component.html',
  styleUrl: './highlight-showcase-component.component.scss',
  standalone: true,
  imports: [ProductCardComponent, NgFor, NgSwitch, NgSwitchCase],
})
export class HighlightShowcaseComponentComponent implements OnInit {
  constructor(public productsService: ProductsService) {}

  @Input() typeShowcase: ShowcaseTypeEnum = ShowcaseTypeEnum.NewProducts;
  @Input() data: any[] = [];
  @Input() loading: boolean = true;
  @Input() error: string = '';

  ngOnInit(): void {}

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
