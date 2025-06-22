import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown-dynamic',
  templateUrl: './dropdown-dynamic.component.html',
  styleUrl: './dropdown-dynamic.component.scss',
  standalone: true,
  imports: [NgIf],
})
export class DropdownDynamicComponent {
  @Input() isOpen: boolean = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  close() {
    this.isOpen = false;
  }
}
