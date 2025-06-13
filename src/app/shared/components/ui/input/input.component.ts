import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  standalone: true,
})
export class InputComponent {
  @Input() type: string = 'text';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() autocomplete: string = 'on';
  @Input() autofocus: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() minlength?: number;
  @Input() maxlength?: number;
  @Input() pattern?: string;
  @Input() size?: number;
  @Input() tabindex?: number;
  @Input() spellcheck: boolean = true;
  @Input() inputmode?: string;
  @Input() ariaLabel?: string;
  @Input() ariaRequired?: string;

@Output() input = new EventEmitter<Event>();
  @Output() change = new EventEmitter<Event>();
  @Output() focus = new EventEmitter<FocusEvent>();
  @Output() blur = new EventEmitter<FocusEvent>();
  @Output() keydown = new EventEmitter<KeyboardEvent>();
  @Output() keyup = new EventEmitter<KeyboardEvent>();
  @Output() keypress = new EventEmitter<KeyboardEvent>();
  @Output() click = new EventEmitter<MouseEvent>();
  @Output() dblclick = new EventEmitter<MouseEvent>();
  @Output() paste = new EventEmitter<ClipboardEvent>();
  @Output() cut = new EventEmitter<ClipboardEvent>();
  @Output() copy = new EventEmitter<ClipboardEvent>();
  @Output() mouseenter = new EventEmitter<MouseEvent>();
  @Output() mouseleave = new EventEmitter<MouseEvent>();
  @Output() contextmenu = new EventEmitter<MouseEvent>();
}
