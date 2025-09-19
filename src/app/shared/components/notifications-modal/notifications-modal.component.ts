import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notifications-modal',
  templateUrl: './notifications-modal.component.html',
  styleUrl: './notifications-modal.component.scss'
})
export class NotificationsModalComponent {

  @Input() title: string = '';
  @Input() tabs: string[] = [];
}
