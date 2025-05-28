import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  standalone: true,
  imports: [NgClass, NgIf],
  styleUrl: './button.component.scss',
})
export class ButtonComponent implements OnInit {
  @Input() text: string = 'Enviar';
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() customClass: string | string[] = [];
  @Input() type: string = '';
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    if (!this.loading && !this.disabled) {
      this.loading = true;
      this.clicked.emit();
    }
  }

  ngOnInit(): void {
    console.log(this.loading);
  }
}
