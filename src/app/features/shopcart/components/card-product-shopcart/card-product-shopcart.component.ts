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
      title: 'Eliminar',
      cssClass: 'product-delete-button',
    },
    {
      title: 'Guardar',
    },
  ];
}
