import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-alert-new-promotions',
  templateUrl: './alert-new-promotions.component.html',
  styleUrl: './alert-new-promotions.component.scss',
  standalone: true,
  imports: [RouterModule, CommonModule],
})
export class AlertNewPromotionsComponent {}
