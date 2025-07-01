import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.scss',
  standalone: true
})
export class ImageCardComponent {

  @Input() image: {src: string, caption: string, alt: string} = { src: '', caption: '', alt: '' }  

}
