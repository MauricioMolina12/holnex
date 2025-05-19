import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../shared/models/user';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { Renderer2, ElementRef } from '@angular/core';
import { AuthService } from '../../../features/auth/auth.service';
import { ThemeService } from '../../../shared/services/theme.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  standalone: false,
  // imports: [CommonModule, RouterModule, SearchInputComponent],
})
export class NavBarComponent implements OnInit {
  viewSideBar = false;
  isMoodDark = false;
  viewSearchInput = false;

  // Items for nav bar
  items: {
    icon: string;
    title: string;
    subtitle?: string;
    path?: string;
    pending?: boolean;
  }[] = [
    {
      icon: 'icon-location',
      title: 'Dirección',
      subtitle: 'Calle 27 #7B-05, Barranquilla, Atlantico.',
    },
    {
      icon: 'icon-shop-cart',
      title: 'Carrito de compras',
      path: '/shopcart',
    },

    // {
    //   icon: 'icon-search',
    //   title: 'Buscar'
    // },
    {
      icon: 'icon-bag',
      title: 'Mis compras',
    },
    {
      icon: 'icon-notifications',
      title: 'Notificaciones',
      pending: true,
    },
    {
      icon: 'icon-heart',
      title: 'Productos favoritos',
    },
    {
      icon: 'icon-history',
      title: 'Mi historial',
    },

    // {
    //   icon: 'icon-store',
    //   title: 'Convertirme en vendedor',
    // },
    {
      icon: 'icon-settings',
      title: 'Configuraciones',
    },
    {
      icon: 'icon-help',
      title: 'Ayuda',
    },
    {
      icon: 'icon-door',
      title: 'Cerrar sesión',
      path: '/user/login',
    },
  ];

  navItems = this.items.slice(0, 6);
  configItems = this.items.slice(7, 11);
  profileItems = this.items.slice(5, 11);

  // Props
  @Input() user!: User;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private elRef: ElementRef,
    public authService: AuthService,
    public themeService: ThemeService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
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

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const scrollTop = (event.target as Document).documentElement.scrollTop;
    const navBar = document.querySelector('nav') as HTMLElement;

    if (scrollTop > 0) {
      navBar.classList.add('scrolled');
    } else {
      navBar.classList.remove('scrolled');
    }
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
    const sidebar = this.elRef.nativeElement.querySelector(`.${classElement}`);
    switch (classElement) {
      case 'nav-bar__sidebar':
        // Manipular la barra lateral en pantallas móviles

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

  nameItemHover: string = '';
  mouseEnter(name: string) {
    this.nameItemHover = name;
  }

  mouseLeave() {
    this.nameItemHover = '';
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

  isLoggued() {
    return this.authService.isLoggued;
  }

  //
  toggleMoodDark(e: Event) {
    this.themeService.toggleTheme();
    e.stopPropagation();
  }

  logOut() {
    this.router.navigate(['/login']);
  }
}
