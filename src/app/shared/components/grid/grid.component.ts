import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

interface header {
  title: string;
  descriptionAction: string;
}

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  standalone: true,
  imports: [NgClass, NgFor],
  styleUrl: './grid.component.scss',
})
export class GridComponent {
  constructor() {}

  @Input() isFullWidth: boolean = false;
  @Input() header!: header;
}
