import { Component, OnInit, Signal, computed } from '@angular/core';
import { AuthService } from '../features/auth/auth.service';
import { NetworkService } from '../core/services/network.service';
import { UiStatus } from '../core/components/status-ui-message/status-ui.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  
  // === Estado de red ===
  isOnline!: Signal<boolean>;
  showConnectionMessage!: Signal<boolean>;
  statusNetwork!: Signal<UiStatus>;

  // === Estado del layout (UI) ===
  isClose: boolean = true;

  constructor(
    private networkService: NetworkService,
    private authService: AuthService
  ) {}


  ngOnInit(): void {
    // Señales de red
    this.isOnline = this.networkService.isOnline;
    this.showConnectionMessage = this.networkService.connectionChanged;

    // Estado de red para componente visual
    this.statusNetwork = computed(() => ({
      type: 'network',
      title: this.isOnline() ? 'Tienes conexión' : 'Sin conexión',
      color: this.isOnline() ? 'var(--color-success)' : 'var(--color-danger)',
      description: this.isOnline()
        ? 'Ahora vuelves a tener conexión! Sigue navegando'
        : 'Por favor verifica tu red y vuelve a intentarlo.',
      actionLabel: 'Reintentar',
      actionType: 'retry',
      options: { isOnline: this.isOnline() }
    }));

    // Lógica centralizada de reconexión y recarga
    this.networkService.refreshAfterOffline();
  }

  
  // === Métodos ===
  closeAlertNewPromotions(): void {
    this.isClose = false;
  }

  isLoggued(): boolean {
    return this.authService.isLoggued;
  }
}
