import { NgIf, NgStyle, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UiStatus } from './status-ui.model';
import { ButtonComponent } from "../../../shared/components/ui/button/button.component";

@Component({
  selector: 'app-status-ui-message',
  standalone: true,
  imports: [NgStyle, NgSwitch, NgSwitchCase, NgIf, ButtonComponent],
  templateUrl: './status-ui-message.component.html',
  styleUrl: './status-ui-message.component.scss'
})
export class StatusUiMessageComponent {

  @Input() status!: UiStatus;
  @Output() action = new EventEmitter<'retry' | 'refresh' | 'custom'>();

}
