import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-product',
  templateUrl: './star-product.component.html',
  styleUrl: './star-product.component.scss',
  standalone: true,
  imports: [NgFor, NgIf, UpperCasePipe],
})
export class StarProductComponent implements OnInit {
  product: any = {};

  constructor() {}

  ngOnInit(): void {
    this.product = {
      image: 'https://mundo-salud-store-3.mybigcommerce.com/content/better_commerce_colombia/variants_files/mochilabosss_png_2024-05-21-03-28-00-2024-05-21-15-28-01-105.png',
      name: 'MORRAL BOSS',
      price: '300.000 COP',
      characteristics: [
        {
          title: 'DISEÑO ESPACIOSO',
          subtitle: 'Contiene elementos esenciales y adicionales con un amplio espacio organizado.'
        },
        {
          title: 'CONFORANTE',
          subtitle: 'Gracias a su material es muy cómodo, reconfortante y fácil de cargar.'
        },
        {
          title: 'INPERMEABLE',
          subtitle: 'El material duradero mantiene las pertenencias seguras en cualquier clima.'
        },
        {
          title: 'AMIGABLE CON LA TECNOLOGÍA',
          subtitle: 'Se amolda a llevar portátiles, tables y demás'
        }
      ],
    };
  }

  buttons = [
    {
      title: 'Comprar ahora'
    },
    {
      title: 'Agregar al carrito',
      iconUrl: 'assets/img/icons/svg/shopcart/shopcart-outline-blue-light.svg'
    },
    {
      title: 'Ver en detalle'
    }
  ]


  comprar(){
    console.log("Comprar");
    
  }
}
