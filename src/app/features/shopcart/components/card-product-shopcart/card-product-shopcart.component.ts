import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-product-shopcart',
  templateUrl: './card-product-shopcart.component.html',
  styleUrl: './card-product-shopcart.component.scss',
})
export class CardProductShopcartComponent {
  @Input() product!: any;

  buttons_options_product = [
    {
      title: 'Comprar ahora',
      cssClass: 'product-buy-now-button',
    },
    {
      cssClass: 'product-delete-button',
      icon: '/assets/img/icons/svg/delete/delete-outline-medium.svg',
    },
  ];
}
