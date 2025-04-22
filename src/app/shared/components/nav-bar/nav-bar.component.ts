import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { SearchInputComponent } from '../search-input/search-input.component';
import { Renderer2, ElementRef } from '@angular/core';
import { AuthService } from '../../../features/auth/auth.service';
import { ThemeService } from '../../services/theme.service';
import { MenuItemsComponent } from '../menu-items/menu-items.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SearchInputComponent,
    MenuItemsComponent,
  ],
})
export class NavBarComponent implements OnInit {
  viewSideBar = false;
  isMoodDark = false;
  viewSearchInput = false;

  // Items for nav bar
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
    //   title: `Modo ${this.isMoodDark ? 'Claro' : 'Oscuro'}`,
    //   toggle: true,
    //   action: 'toggleMoodDark',
    // },
    {
      icon: '/assets/img/icons/svg/shopcart/shopcart-outline-medium.svg',
      title: 'Carrito de compras',
      path: '/shopcart',
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
      title: 'Convertirme en vendedor',
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
      path: '/user/login',
    },
  ];

  navItems = this.items.slice(0, 7);
  configItems = this.items.slice(7, 11);
  profileItems = this.items.slice(5, 11);

  // Props
  @Input() user!: User;
  @Input() isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private elRef: ElementRef,
    public authService: AuthService,
    private themeService: ThemeService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.themeService.darkMode$.subscribe((isDark) => {
      this.isMoodDark = isDark;
    });

    this.user = {
      id: '12345678900987654321',
      cellphone: '3008236761',
      country_id: '48',
      created_at: '2025-01-15',
      email: 'ruizsheila0384@gmail.com',
      image:
        'https://media.istockphoto.com/id/1368424494/es/foto/retrato-de-estudio-de-una-mujer-alegre.jpg?s=612x612&w=0&k=20&c=V6sLE6kK9t4_QJtnTJ5kp8c8poiWuqdgWdJh59zV14A=',
      language_id: '1',
      name: 'Sheila Ruiz',
      password: '***********',
      role: 'premium',
      source: '',
      address: this.authService.isLoggued
        ? 'Calle 25 #28 A18. San Sebastián, Magdalena.'
        : '',
    };
  }

  redirectItemNavBar(item: string) {
    this.router.navigate([`${item}`]);
    const sidebar = this.elRef.nativeElement.querySelector('.nav-bar__sidebar');
    if (sidebar) {
      this.renderer.removeClass(sidebar, 'visibility');
      this.viewSideBar = false;
    }
  }

  toggleElement(e: Event, classElement: string, type: string = 'close') {
    switch (classElement) {
      case 'nav-bar__sidebar':
        // Manipular la barra lateral en pantallas móviles
        const sidebar = this.elRef.nativeElement.querySelector(
          `.${classElement}`
        );
        if (sidebar) {
          const body = this.document.querySelector('body');
          if (sidebar.classList.contains('visibility')) {
            this.renderer.removeClass(sidebar, 'visibility');
            this.viewSideBar = false;
            this.renderer.removeClass(body, 'disabled');
          } else {
            this.renderer.addClass(sidebar, 'visibility');
            this.renderer.addClass(sidebar, 'blur-10px');
            this.renderer.addClass(sidebar, 'bg-blur');
            this.viewSideBar = true;
            this.renderer.addClass(body, 'disabled');
          }
        } else {
          console.error('No se encontró el elemento .nav-bar__sidebar');
        }
        break;

      case 'nav-bar__modal-profile':
        // Activar o desactivar el modal del perfil en pantallas grandes
        e.stopPropagation();
        const modalProfile = this.elRef.nativeElement.querySelector(
          `.${classElement}`
        );
        if (modalProfile) {
          const isActive = modalProfile.classList.contains('active');
          if (isActive) {
            this.renderer.removeClass(modalProfile, 'active');
            document.removeEventListener('click', (event) =>
              this.closeModalOnOutsideClick(event, classElement)
            );
          } else {
            this.renderer.addClass(modalProfile, 'active');
            document.addEventListener('click', (event) =>
              this.closeModalOnOutsideClick(event, classElement)
            );
          }
        }
        break;

      case 'nav-bar__center':
        // Activar o desactivar el campo de búsqueda en pantallas grandes
        e.stopPropagation();
        this.viewSearchInput = !this.viewSearchInput;
        const searchContainer = this.elRef.nativeElement.querySelector(
          `.${classElement}`
        );
        if (searchContainer) {
          const isActive = searchContainer.classList.contains('active');
          if (isActive) {
            this.renderer.removeClass(searchContainer, 'active');
            document.removeEventListener('click', (event) =>
              this.closeModalOnOutsideClick(event, classElement)
            );
          } else {
            this.renderer.addClass(searchContainer, 'active');
            document.addEventListener('click', (event) =>
              this.closeModalOnOutsideClick(event, classElement)
            );
          }
        }
        break;
    }
  }

  //Function to know when a click is made outside the element
  closeModalOnOutsideClick = (event: Event, modalClass: string) => {
    const modalElement = this.elRef.nativeElement.querySelector(
      `.${modalClass}`
    );
    if (modalElement && !modalElement.contains(event.target as Node)) {
      this.renderer.removeClass(modalElement, 'active');
      this.document.removeEventListener('click', (e) =>
        this.closeModalOnOutsideClick(e, modalClass)
      );
    }
  };

  isLoggued(): boolean {
    return this.authService.isLoggued;
  }

  //
  toggleMoodDark(e: Event) {
    this.isMoodDark = !this.isMoodDark;
    e.stopPropagation();
  }

  logOut() {
    this.router.navigate(['/login']);
  }
}
