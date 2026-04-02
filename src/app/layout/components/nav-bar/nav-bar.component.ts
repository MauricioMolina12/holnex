import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  Signal,
  DOCUMENT,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Renderer2, ElementRef } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { AuthFacade } from '../../../core/auth/auth.facade';
import { AuthUser } from '../../../shared/models/auth-user.model';

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
  unread?: boolean;
  group: 'user' | 'config' | 'profile';
  action?: (event?: Event) => void;
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  standalone: false,
})
export class NavBarComponent implements OnInit {
  viewSideBar = false;
  isDark!: Signal<boolean>;
  viewSearchInput = false;

  navbar_items: NavBarItem[] = [];
  userItems: NavBarItem[] = [];
  configItems: NavBarItem[] = [];
  profileItems: NavBarItem[] = [];
  viewNotifications = false;

  /** Auth signals from the centralized facade */
  user: Signal<AuthUser | null>;
  isAuthenticated: Signal<boolean>;

  /** Computed helpers for the template */
  userName: Signal<string>;
  userAvatar: Signal<string>;
  userEmail: Signal<string>;
  userAddress: Signal<string>;

  nameItemHover = '';

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private elRef: ElementRef,
    public authFacade: AuthFacade,
    public themeService: ThemeService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.user = this.authFacade.currentUser;
    this.isAuthenticated = this.authFacade.isAuthenticated;

    this.userName = computed(() => this.user()?.name ?? 'Invitado');
    this.userAvatar = computed(() => this.user()?.avatar ?? 'assets/img/user-default.jpg');
    this.userEmail = computed(() => this.user()?.email ?? '');
    this.userAddress = computed(() => this.user()?.address ?? 'No tienes una dirección registrada');
  }

  ngOnInit(): void {
    this.isDark = this.themeService.darkModeSignal;
    this.buildNavItems();
  }

  private buildNavItems(): void {
    this.navbar_items = [
      {
        profile: {
          avatar: this.userAvatar(),
          name: this.isAuthenticated() ? this.userName() : 'Ingresar cuenta',
          email: this.isAuthenticated() ? this.userEmail() : 'Podrás interactuar con tu cuenta',
        },
        group: 'user',
        path: '/profile',
      },
      {
        icon: 'icon-home',
        title: 'Inicio',
        group: 'user',
        path: '/',
        action: () => this.navigateRoute('/'),
      },
      {
        icon: 'icon-location',
        title: 'Dirección',
        subtitle: this.userAddress(),
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
        action: () => this.navigateRoute('/shopcart'),
      },
      {
        icon: 'icon-bag',
        title: 'Mis compras',
        group: 'user',
      },
      {
        icon: 'icon-notifications',
        title: 'Notificaciones',
        unread: true,
        group: 'user',
        action: () => (this.viewNotifications = !this.viewNotifications),
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
        group: 'config',
        action: () => this.logOut(),
      },
    ];

    this.userItems = this.navbar_items.filter((item) => item.group === 'user');
    this.configItems = this.navbar_items.filter((item) => item.group === 'config');
    this.profileItems = this.navbar_items.filter((item) => item.group === 'profile');
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    if (!isPlatformBrowser(this.platformId)) return;

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

  toggleElement(e: Event | undefined, classElement: string, type: string = 'close') {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const elementHTML = this.elRef.nativeElement.querySelector(`.${classElement}`);
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
        this.toggleOutsideClickListener(classElement, elementHTML.classList.contains('active'));
        break;

      case 'nav-bar__center':
        this.viewSearchInput = !this.viewSearchInput;
        this.toggleClass(elementHTML, 'active');
        this.toggleOutsideClickListener(classElement, elementHTML.classList.contains('active'));
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
    const handler = (event: Event) => this.closeModalOnOutsideClick(event, classElement);

    if (isActive) {
      document.addEventListener('click', handler);
    } else {
      document.removeEventListener('click', handler);
    }
  }

  private closeModalOnOutsideClick = (event: Event, elementClass: string) => {
    const modalElement = this.elRef.nativeElement.querySelector(`.${elementClass}`);
    if (modalElement && !modalElement.contains(event.target as Node)) {
      this.renderer.removeClass(modalElement, 'active');
      this.document.removeEventListener('click', (e) =>
        this.closeModalOnOutsideClick(e, elementClass)
      );
    }
  };

  seeTooltipItem(name: string) {
    this.nameItemHover = name;
  }
  seeTooltipItemLeave() {
    this.nameItemHover = '';
  }

  toggleMoodDark(e: Event) {
    this.themeService.toggleTheme();
    e.stopPropagation();
  }

  logOut() {
    this.authFacade.logout();
  }
}
