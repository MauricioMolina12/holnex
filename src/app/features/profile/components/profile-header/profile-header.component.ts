import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AuthUser } from '../../../../shared/models/auth-user.model';
import { SidebarLink } from '../../models/profile.model';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ProfileHeaderComponent {
  @Input() user: AuthUser | null = null;
  @Input() loading: boolean = false;
  @Input() activeRoute: string = '';

  readonly tabs: SidebarLink[] = [
    { label: 'Resumen',        route: 'overview',  icon: 'icon-home'     },
    { label: 'Mis pedidos',    route: 'orders',    icon: 'icon-box'    },
    { label: 'Configuración',  route: 'settings',  icon: 'icon-settings' },
  ];

  isActive(route: string): boolean {
    return this.activeRoute.includes(route);
  }

  get userInitials(): string {
    if (!this.user?.name) return '?';
    return this.user.name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  get memberSince(): string {
    if (!this.user?.createdAt) return '';
    return new Date(this.user.createdAt).getFullYear().toString();
  }
}
