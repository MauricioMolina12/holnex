import { NgFor, NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  standalone: true,
  styleUrl: './services.component.scss',
  imports: [NgFor, NgStyle],
})
export class ServicesComponent {
  servicesHorizon = [
    {
      name: 'Organización de eventos',
      color: '#FF5733',
      icon: 'https://cdn3d.iconscout.com/3d/premium/thumb/lista-de-eventos-8105851-6491366.png?f=webp',
      description:
        'Planificación, coordinación y ejecución de eventos corporativos, sociales y culturales.',
    },
    // {
    //   name: 'Consultoría',
    //   color: '#2E86C1',
    //   icon: 'https://cdn3d.iconscout.com/3d/premium/thumb/consultoria-idea-creativa-7544391-6166279.png?f=webp',
    //   description:
    //     'Asesoramiento experto en estrategias de negocio, optimización de procesos y gestión empresarial.',
    // },
    {
      name: 'Diseño UI UX',
      color: '#9C27B0',
      icon: 'https://cdn3d.iconscout.com/3d/premium/thumb/diseno-ui-7199320-5846532.png',
      description:
        'Creación de interfaces intuitivas y experiencias de usuario atractivas para productos digitales.',
    },
    {
      name: 'Fotografía',
      color: '#4CAF50',
      icon: 'https://static.vecteezy.com/system/resources/previews/045/686/622/non_2x/flash-camera-3d-illustration-free-png.png',
      description:
        'Captura de momentos únicos con un enfoque profesional en fotografía de eventos, productos y retratos.',
    },
  ];
}
