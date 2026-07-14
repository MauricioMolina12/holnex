import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-store-card-stats',
  templateUrl: './store-card-stats.component.html',
  styleUrls: ['./store-card-stats.component.scss'],
  standalone: false,
})
export class StoreCardStatsComponent {
  @Input() title: string = '';
  @Input() value: number | string = 0;
  @Input() suffix?: string;
  @Input() change: number = 0;
  @Input() period: string = 'last week';
}