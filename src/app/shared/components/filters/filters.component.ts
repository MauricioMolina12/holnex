import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
})
export class FiltersComponent implements OnInit {
  
  openFilters: boolean = false;

  toggleModal(type: string) {
    switch (type) {
      case 'filters':
        this.openFilters = !this.openFilters;
    }
  }

  ngOnInit(): void {
    this.filters = [
      'Precio',
      'Marca',
      'Puntuación',
      'Color',
      'Más vendidos',
      'En ofertas',
      'Basado en tus gustos',
    ];
  }

  @Input() filters: any[] = [];
}
