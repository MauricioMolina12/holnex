import { NgClass, NgFor, NgStyle } from '@angular/common';
import { Component, OnInit, Signal } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-services-grid',
  templateUrl: './services-grid.component.html',
  standalone: true,
  styleUrl: './services-grid.component.scss',
  imports: [NgFor, NgStyle, NgClass],
})
export class ServicesGridComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  isDark!: Signal<boolean>;
  ngOnInit(): void {
    this.isDark = this.themeService.darkModeSignal;
  }

  servicesHorizon = [
    {
      name: 'Organización de eventos',
      color: '#FF5733',
      icon: 'icon-calendar',
      description:
        'Planificación, coordinación y ejecución de eventos corporativos, sociales y culturales.',
    },
    {
      name: 'Diseño UI UX',
      color: '#9C27B0',
      icon: 'icon-UI',
      description:
        'Creación de interfaces intuitivas y experiencias de usuario atractivas para productos digitales.',
    },
    {
      name: 'Fotografía',
      color: '#4CAF50',
      icon: 'icon-camera',
      description:
        'Captura de momentos únicos con un enfoque profesional en fotografía de eventos, productos y retratos.',
    },
  ];
}
