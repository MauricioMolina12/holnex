import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-product',
  templateUrl: './product-star.component.html',
  styleUrl: './product-star.component.scss',
  standalone: false,
  // imports: [NgFor, NgIf, UpperCasePipe],
})
export class ProductStarComponent implements OnInit {
  product: any = {};

  constructor() {}

  ngOnInit(): void {
    this.product = {
      image: 'https://www.mipcparquecentral.com/cdn/shop/files/ComputadorInteCorei511400.jpg?v=1711985417',
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
      icon: 'icon-shop-cart'
    },
    {
      title: 'Ver en detalle'
    }
  ]


  comprar(){
    console.log("Comprar");
    
  }
}
