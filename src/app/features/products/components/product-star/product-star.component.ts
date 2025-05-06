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
      image: 'https://www.professionalwireless.com.co/wp-content/uploads/2022/09/Portatail-DELL-g15-gaming-500x450.png',
      name: 'PORTATIL DELL GAMER',
      price: '4.000.000 COP',
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
