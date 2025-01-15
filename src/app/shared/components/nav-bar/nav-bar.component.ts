import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class NavBarComponent implements OnInit{
  viewSideBar = false;
  isMoodDark = false;

  @Input() user!: User;
  @Input() isLoggedIn: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.user = {
      id: '12345678900987654321',
      cellphone: '3008236761',
      country_id: '48',
      created_at: '2025-01-15',
      email: 'ruizsheila0384@gmail.com',
      image: 'https://media-bog2-1.cdn.whatsapp.net/v/t61.24694-24/465958398_543191191966881_7644225017540583979_n.jpg?ccb=11-4&oh=01_Q5AaIEDQXmRr1CaiVrtHRT8yU67gagUKoo-V5Jn0aX5L0OpM&oe=6795308C&_nc_sid=5e03e0&_nc_cat=106',
      language_id: '1',
      name: 'Sheila Ruiz',
      password: '***********',
      role: 'premium',
      source: '',
      address: 'Calle 25 #28 A18.Sabanalarga, Atlántico.',
    }
  }

  togglesidebar() {
    const sidebar = document.querySelector('.nav-bar__sidebar');
    if (sidebar) {
      sidebar.classList.toggle('visibility');
      if (sidebar.classList.contains('visibility')) {
        this.viewSideBar = true;
      } else {
        this.viewSideBar = false;
      }
    } else {
      console.error('No se encontró el elemento .nav-bar__sidebar');
    }
  }

  toggleModalProfile() {
    const modalProfile = document.querySelector('.nav-bar__modal-profile');
    if (modalProfile) {
      modalProfile.classList.toggle('active');
    }
  }

  toggleMoodDark(e: Event) {
    this.isMoodDark = !this.isMoodDark;
    e.stopPropagation();
  }

  items: any[] = [
    {
      icon: '/assets/img/icons/svg/location/location-outline-medium.svg',
      title: 'Dirección',
      subtitle: 'Calle 27 #7B-05, Barranquilla, Atlantico.',
    },
    // {
    //   icon: this.isMoodDark
    //     ? '/assets/img/icons/svg/sun/sun-outline-medium.svg'
    //     : '/assets/img/icons/svg/moon/moon-outline-medium.svg',
    //   title: `Modo ${ this.isMoodDark ? 'Claro' : 'Oscuro' }`,
    //   toggle: true,
    //   action: 'toggleMoodDark',
    // },
    {
      icon: '/assets/img/icons/svg/shopcart/shopcart-outline-medium.svg',
      title: 'Carrito de compras',
    },
    {
      icon: '/assets/img/icons/svg/bag/bag-outline-medium.svg',
      title: 'Mis compras',
    },
    {
      icon: '/assets/img/icons/svg/notifications/notifications-outline-medium.svg',
      title: 'Notificaciones',
      pending: true,
    },
    {
      icon: '/assets/img/icons/svg/email/email-outline-medium.svg',
      title: 'Mensajes',
      pending: true,
    },
    {
      icon: '/assets/img/icons/svg/history/history-outline-medium.svg',
      title: 'Mi historial',
    },
    {
      icon: '/assets/img/icons/svg/heart/heart-outline-medium.svg',
      title: 'Productos favoritos',
    },
    {
      icon: '/assets/img/icons/svg/box/box-outline-medium.svg',
      title: 'Mi negocio',
    },
    {
      icon: '/assets/img/icons/svg/settings/settings-outline-medium.svg',
      title: 'Configuraciones',
    },
    {
      icon: '/assets/img/icons/svg/help/help-outline-medium.svg',
      title: 'Ayuda',
    },
    {
      icon: '/assets/img/icons/svg/door/door-outline-danger.svg',
      title: 'Cerrar sesión',
    },
  ];
}
