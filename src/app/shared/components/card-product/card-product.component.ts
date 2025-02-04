import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss'
})
export class CardProductComponent {

  @Input() product: any;
  @Input() horizontal: boolean = false;

  @Output() productClick = new EventEmitter<any>(); // => Event to see the detailed

  onProductClick(product: any): void {
    this.productClick.emit(product);
  }
}
