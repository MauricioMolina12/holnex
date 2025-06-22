import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  standalone: true,
  imports: [NgClass, NgIf],
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() text!: string | number | null;
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() customClass: string | string[] = [];
  @Input() variant: 'solid' | 'outline' | 'ghost' = 'solid';
  @Input() classCustom: {
    base?: string;
    textColor?: string;
    bgColor?: string;
    more?: string[];
  } = {};

  @Input() type: string = '';
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    if (!this.loading && !this.disabled) {
      this.loading = true;
      this.clicked.emit();
    }
  }

  get buttonClasses(): string[] {
    const classes = [];

    const base = this.classCustom.base || 'button';
    classes.push(base);

    const type =
      this.variant === 'solid'
        ? `button--${this.classCustom.bgColor || 'primary'}`
        : `button--${this.variant}-${this.classCustom.bgColor || 'primary'}`;

    classes.push(type);

    // Icon-only
    if (this.icon && !this.text) classes.push('button--icon-only');

    // Estado loading
    if (this.loading) classes.push('button--loading');

    // Text color
    if (this.classCustom.textColor) {
      classes.push(`button--text-${this.classCustom.textColor}`);
    }
    
    // Clases extra
    if (this.classCustom.more) classes.push(...this.classCustom.more);
    if (this.customClass) {
      if (Array.isArray(this.customClass)) classes.push(...this.customClass);
      else classes.push(this.customClass);
    }

    return classes;
  }
}
