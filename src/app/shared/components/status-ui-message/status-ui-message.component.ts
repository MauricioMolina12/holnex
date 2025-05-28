import { NgStyle, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UiStatus } from './status-ui.model';

@Component({
  selector: 'app-status-ui-message',
  standalone: true,
  imports: [NgStyle, NgSwitch, NgSwitchCase],
  templateUrl: './status-ui-message.component.html',
  styleUrl: './status-ui-message.component.scss'
})
export class StatusUiMessageComponent {

  @Input() status!: UiStatus;
}
