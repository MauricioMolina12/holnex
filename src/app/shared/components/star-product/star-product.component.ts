import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-product',
  templateUrl: './star-product.component.html',
  styleUrl: './star-product.component.scss',
  standalone: true,
  imports: [NgFor],
})
export class StarProductComponent implements OnInit {
  product: any = {};

  constructor() {}

  ngOnInit(): void {
    this.product = {
      image: 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCO/127344182_01/w=1500,h=1500,fit=pad',
      name: 'Pc Gamer AMD Ryzen 5 8600G',
      price: '3000000',
      characteristics: [
        'Arquitectura Zen 4',
        '6 núcleos y 12 hilos',
        'Frecuencia Turbo hasta 5.0 GHz',
        'Gráficos integrados AMD Radeon™ 760M',
      ],
    };
  }
}
