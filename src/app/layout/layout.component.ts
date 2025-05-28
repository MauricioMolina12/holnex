import { Component, OnInit, computed, Signal } from '@angular/core';
import { AuthService } from '../features/auth/auth.service';
import { NetworkService } from '../shared/services/network.service';
import { UiStatus } from '../shared/components/status-ui-message/status-ui.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  isOnline!: Signal<boolean>;
  statusNetwork!: Signal<UiStatus>;
  showConnectionMessage!: Signal<boolean>;

  constructor(private networkService: NetworkService, private authService: AuthService) {}

  ngOnInit(): void {
    this.isOnline = this.networkService.isOnline;
    this.showConnectionMessage = this.networkService.connectionChanged;

    this.statusNetwork = computed(() => ({
      type: 'network',
      title: this.isOnline() ? 'Tienes conexión' : 'Sin conexión',
      color: this.isOnline() ? 'var(--color-success)' : 'var(--color-danger)',
    }));
  }

  isClose: boolean = true;

  closeAlertNewPromotions() {
    this.isClose = false;
  }

  isLoggued(): boolean {
    return this.authService.isLoggued;
  }
}
