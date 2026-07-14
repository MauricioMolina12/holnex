import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '../../models/my-stores.model';
import { getInitials, stringToColor } from '../../../../utils/functions';

@Component({
  selector: 'app-store-card',
  standalone: false,
  templateUrl: './store-card.component.html',
  styleUrl: './store-card.component.scss',
})
export class StoreCardComponent {
  @Input() store: Store | null = null;
  @Output() storeClick = new EventEmitter<Store>();

  stringToColor = stringToColor;
  getInitials = getInitials;
}
