import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  Signal
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { User } from '../../../shared/models/user';
import { SearchInputComponent } from '../../../shared/components/search-input/search-input.component';
import { Renderer2, ElementRef } from '@angular/core';
import { AuthService } from '../../../features/auth/auth.service';
import { ThemeService } from '../../../core/services/theme.service';
import { filter } from 'rxjs';

interface UserNav {
  name: string;
  avatar: string;
  email: string;
}

interface NavBarItem {
  profile?: UserNav;
  icon?: string;
  title?: string;
  subtitle?: string;
  path?: string;
  pending?: boolean;
  group: 'user' | 'config' | 'profile';
  action?: (event?: Event) => void;
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  standalone: false,
  // imports: [CommonModule, RouterModule, SearchInputComponent],
})
export class NavBarComponent implements OnInit {
  
  viewSideBar = false;
  isDark!: Signal<boolean>;
  viewSearchInput = false;

  navbar_items: NavBarItem[] = [];

  userItems: NavBarItem[] = [];
  configItems: NavBarItem[] = [];
  profileItems: NavBarItem[] = [];
  

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
    
    this.isDark = this.themeService.darkModeSignal;

    this.user = {
      id: '12345678900987654321',
      cellphone: '3008236761',
      country_id: '48',
      created_at: '2025-01-15',
      email: 'freddyvega@gmail.com',
      image: 'https://b2472105.smushcdn.com/2472105/wp-content/uploads/2023/01/Fotografo-Monterrey-_49-1-819x1024.jpg?lossy=1&strip=1&webp=1',
      language_id: '1',
      name: 'Freddy Vega',
      password: '***********',
      role: 'premium',
      source: '',
      address: this.authService.isLoggued
        ? 'Calle 25 #28 A18. San Sebastián, Magdalena.'
        : '',
    };

    this.navbar_items = [
      {
        profile: {
          avatar: this.isLoggued() ? this.user.image : 'assets/img/user-default.jpg',
          name: this.isLoggued() ? this.user.name : 'Ingresar cuenta',
          email: this.isLoggued() ? this.user.email : 'Podrás interactuar con tu cuenta',
        },
        group: 'user',
      },
      {
        icon: 'icon-home',
        title: 'Inicio',
        group: 'user',
        path: '/',
        action: (event?: Event) => this.navigateRoute('/'),
      },
      {
        icon: 'icon-location',
        title: 'Dirección',
        subtitle: this.user.address ? this.user.address : 'No tienes una dirección registrada',
        group: 'user',
      },
      {
        icon: 'icon-search',
        title: 'Buscar',
        group: 'user',
        action: (event?: Event) => this.toggleElement(event, 'nav-bar__center'),
      },
      {
        icon: 'icon-shop-cart',
        title: 'Carrito',
        path: '/shopcart',
        group: 'user',
        action: (event?: Event) => this.navigateRoute('/shopcart'),
      },
      {
        icon: 'icon-bag',
        title: 'Mis compras',
        group: 'user',
      },
      {
        icon: 'icon-notifications',
        title: 'Notificaciones',
        pending: true,
        group: 'user',
      },
      {
        icon: 'icon-heart',
        title: 'Productos favoritos',
        group: 'user',
      },
      {
        icon: 'icon-history',
        title: 'Mi historial',
        group: 'user',
      },

      // {
      //   icon: 'icon-store',
      //   title: 'Convertirme en vendedor',
      // },
      {
        icon: 'icon-settings',
        title: 'Configuraciones',
        group: 'config',
      },
      {
        icon: 'icon-help',
        title: 'Ayuda',
        group: 'config',
      },
      {
        icon: 'icon-door',
        title: 'Cerrar sesión',
        path: '/user/login',
        group: 'config',
        action: (event?: Event) => this.navigateRoute('/user/login'),
      },
    ];

    this.userItems = this.navbar_items.filter((item) => item.group === 'user');
    this.configItems = this.navbar_items.filter((item) => item.group === 'config');
    this.profileItems = this.navbar_items.filter((item) => item.group === 'profile');
  }

  @Input() user!: User;

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

  navigateRoute(item: string) {
    if (item) {
      this.router.navigate([`${item}`]);
      this.closeSidebar();
    }
  }

  closeSidebar() {
    const sidebar = this.elRef.nativeElement.querySelector('.nav-bar__sidebar');
    if (sidebar && sidebar.classList.contains('visibility')) {
      this.renderer.removeClass(sidebar, 'visibility');
      this.viewSideBar = false;
    }
  }

  toggleElement(
    e: Event | undefined,
    classElement: string,
    type: string = 'close'
  ) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const elementHTML = this.elRef.nativeElement.querySelector(
      `.${classElement}`
    );
    const sidebar = this.elRef.nativeElement.querySelector('.nav-bar__sidebar');

    if (!elementHTML) {
      console.error(`No se encontró el elemento .${classElement}`);
      return;
    }

    switch (classElement) {
      case 'nav-bar__sidebar':
        this.toggleClass(elementHTML, 'visibility');
        this.viewSideBar = elementHTML.classList.contains('visibility');
        break;

      case 'nav-bar__modal-profile':
        this.toggleClass(elementHTML, 'active');
        this.toggleOutsideClickListener(
          classElement,
          elementHTML.classList.contains('active')
        );
        break;

      case 'nav-bar__center':
        this.viewSearchInput = !this.viewSearchInput;
        this.toggleClass(elementHTML, 'active');
        this.toggleOutsideClickListener(
          classElement,
          elementHTML.classList.contains('active')
        );

        if (sidebar?.classList.contains('visibility')) {
          this.renderer.removeClass(sidebar, 'visibility');
          this.viewSideBar = false;
        }
        break;
    }
  }

  private toggleClass(el: Element, className: string) {
    if (el.classList.contains(className)) {
      this.renderer.removeClass(el, className);
    } else {
      this.renderer.addClass(el, className);
    }
  }

  private toggleOutsideClickListener(classElement: string, isActive: boolean) {
    const handler = (event: Event) =>
      this.closeModalOnOutsideClick(event, classElement);

    if (isActive) {
      document.addEventListener('click', handler);
    } else {
      document.removeEventListener('click', handler);
    }
  }

  //Function to know when a click is made outside the element
  private closeModalOnOutsideClick = (event: Event, elementClass: string) => {
    const modalElement = this.elRef.nativeElement.querySelector(
      `.${elementClass}`
    );
    if (modalElement && !modalElement.contains(event.target as Node)) {
      this.renderer.removeClass(modalElement, 'active');
      this.document.removeEventListener('click', (e) =>
        this.closeModalOnOutsideClick(e, elementClass)
      );
    }
  };

  nameItemHover: string = '';
  seeTooltipItem(name: string) {
    this.nameItemHover = name;
    
  }
  seeTooltipItemLeave() {
    this.nameItemHover = '';
  }

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
