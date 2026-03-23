import { Component, OnInit } from '@angular/core';
import { Ad } from '../../../../shared/models/ads';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: false
})
export class LoginComponent implements OnInit {
  constructor() {}

  // Signals for ads
  ads: Ad[] = [
    {
      title: 'Hay una oferta también para ti',
      description: 'Aprovecha y ahorra en esos artículos que estabas buscando.',
      imageUrl: 'https://i.ebayimg.com/images/g/PowAAOSwg8dn1EnL/s-l1600.webp',
    },
    {
      title: 'Devoluciones simplificadas',
      description: '¿No estás feliz con tu compra? La devolución es fácil.',
      imageUrl: 'https://i.ebayimg.com/images/g/wIAAAOSwMcdnyH7z/s-l1600.webp',
    },
    {
      title: 'Recibe tu pedido o tu dinero',
      description:
        'Compra con confianza con Devolución de tu dinero de Holnex.',
      imageUrl: 'https://i.ebayimg.com/images/g/ucUAAOSwsV9nuKhe/s-l1600.webp',
    },
  ];

  ngOnInit(): void {}
}
