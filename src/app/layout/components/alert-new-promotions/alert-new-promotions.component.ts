import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../../shared/services/theme.service';

@Component({
  selector: 'app-alert-new-promotions',
  templateUrl: './alert-new-promotions.component.html',
  styleUrl: './alert-new-promotions.component.scss',
  standalone: true,
  imports: [RouterModule, CommonModule],
})
export class AlertNewPromotionsComponent implements OnInit {
  isDark!: Signal<boolean>;
  @Output() closeThisComponent = new EventEmitter<boolean>(false);

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.isDark = this.themeService.darkModeSignal;
  }

  closeComponent() {
    this.closeThisComponent.emit(true);
  }
}
