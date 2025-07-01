import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: false,
  // imports: [NgFor, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  year: number = new Date().getFullYear();

  Columns = [
    {
      title: 'Acerca de Holnex',
      items: [
        {
          text: 'Blog',
          redirect: '',
        },
        {
          text: 'Quienes somos',
          type: 'href',
          redirect: 'https://news.mercadolibre.com/',
        },
        {
          text: 'Tendencias',
          redirect: '',
        },
      ],
    },
    {
      title: 'Ayuda / PQR',
      items: [
        {
          text: 'Comprar',
          redirect: '',
        },
        {
          text: 'Vender',
          redirect: '',
        },
        {
          text: 'Seguridad',
          redirect: '',
        },
      ],
    },
    {
      title: 'Mi perfil',
      items: [
        {
          text: 'Resumen',
          redirect: '',
        },
        {
          text: 'Favoritos',
          redirect: '',
        },
        {
          text: 'Vender',
          redirect: '',
        },
        {
          text: 'Mi carrito de compras',
          redirect: '/shopcart',
        },
      ],
    },
    {
      title: 'Temporadas',
      items: [
        {
          text: 'Black Friday',
          redirect: '',
        },
        {
          text: 'Hot Sale',
          redirect: '',
        },
        {
          text: 'Promociones',
          redirect: '',
        },
      ],
    },
  ];
}
