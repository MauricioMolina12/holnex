import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileUser, SidebarLink } from '../../models/profile.model';

@Component({
  selector: 'app-profile-sidebar',
  templateUrl: './profile-sidebar.component.html',
  styleUrl: './profile-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ProfileSidebarComponent {
  @Input() user: ProfileUser | null = null;
  @Input() activeRoute: string = '';
  @Output() logout = new EventEmitter<void>();

  readonly links: SidebarLink[] = [
    { label: 'Resumen', route: 'overview', icon: 'icon-home' },
    { label: 'Mis pedidos', route: 'orders', icon: 'icon-order' },
    { label: 'Configuración', route: 'settings', icon: 'icon-settings' },
  ];

  isActive(route: string): boolean {
    return this.activeRoute.includes(route);
  }

  onLogout(): void {
    this.logout.emit();
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
}
