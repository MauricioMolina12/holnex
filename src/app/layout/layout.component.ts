import { Component } from '@angular/core';
import { AuthService } from '../features/auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  constructor(private authService: AuthService) {}

  isClose: boolean = true;

  closeAlertNewPromotions() {
    this.isClose = false;
  }

  isLoggued(): boolean {
    return this.authService.isLoggued;
  }
}
