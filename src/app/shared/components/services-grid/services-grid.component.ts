import { NgClass, NgFor, NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-services-grid',
  templateUrl: './services-grid.component.html',
  standalone: true,
  styleUrl: './services-grid.component.scss',
  imports: [NgFor, NgStyle, NgClass],
})
export class ServicesGridComponent {
  servicesHorizon = [
    {
      name: 'Organización de eventos',
      color: '#FF5733',
      icon: 'icon-notifications',
      description:
        'Planificación, coordinación y ejecución de eventos corporativos, sociales y culturales.',
    },
    {
      name: 'Consultoría',
      color: '#2E86C1',
      icon: 'https://cdn3d.iconscout.com/3d/premium/thumb/consultoria-idea-creativa-7544391-6166279.png?f=webp',
      description:
        'Asesoramiento experto en estrategias de negocio, optimización de procesos y gestión empresarial.',
    },
    {
      name: 'Consultoría',
      color: '#2E86C1',
      icon: 'https://cdn3d.iconscout.com/3d/premium/thumb/consultoria-idea-creativa-7544391-6166279.png?f=webp',
      description:
        'Asesoramiento experto en estrategias de negocio, optimización de procesos y gestión empresarial.',
    },
    {
      name: 'Consultoría',
      color: '#2E86C1',
      icon: 'https://cdn3d.iconscout.com/3d/premium/thumb/consultoria-idea-creativa-7544391-6166279.png?f=webp',
      description:
        'Asesoramiento experto en estrategias de negocio, optimización de procesos y gestión empresarial.',
    },
    {
      name: 'Consultoría',
      color: '#2E86C1',
      icon: 'https://cdn3d.iconscout.com/3d/premium/thumb/consultoria-idea-creativa-7544391-6166279.png?f=webp',
      description:
        'Asesoramiento experto en estrategias de negocio, optimización de procesos y gestión empresarial.',
    },
    {
      name: 'Consultoría',
      color: '#2E86C1',
      icon: 'https://cdn3d.iconscout.com/3d/premium/thumb/consultoria-idea-creativa-7544391-6166279.png?f=webp',
      description:
        'Asesoramiento experto en estrategias de negocio, optimización de procesos y gestión empresarial.',
    },
    {
      name: 'Consultoría',
      color: '#2E86C1',
      icon: 'https://cdn3d.iconscout.com/3d/premium/thumb/consultoria-idea-creativa-7544391-6166279.png?f=webp',
      description:
        'Asesoramiento experto en estrategias de negocio, optimización de procesos y gestión empresarial.',
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
