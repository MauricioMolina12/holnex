import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProfileStats } from '../../models/profile.model';

@Component({
  selector: 'app-profile-stats',
  templateUrl: './profile-stats.component.html',
  styleUrl: './profile-stats.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ProfileStatsComponent {
  @Input() stats: ProfileStats | null = null;
  @Input() loading: boolean = false;

  get statCards() {
    return [
      { label: 'Pedidos totales', value: this.stats?.totalOrders ?? 0, icon: 'icon-box', colorVar: '#fff', bgColor: 'rgba(41, 121, 255, 0.12)' },
      { label: 'Pedidos pendientes', value: this.stats?.pendingOrders ?? 0, icon: 'icon-history', colorVar: '#fff', bgColor: 'rgba(253, 197, 32, 0.12)' },
      { label: 'Total gastado', value: `$${(this.stats?.totalSpent ?? 0).toLocaleString('es-MX', { minimumFractionDigits: 2 })}`, icon: 'icon-receipt', colorVar: '#fff', bgColor: 'rgba(58, 163, 55, 0.12)' },
      { label: 'Guardados', value: this.stats?.savedItems ?? 0, icon: 'icon-heart', colorVar: '#fff', bgColor: 'rgba(220, 64, 64, 0.12)' },
    ];
  }
}
