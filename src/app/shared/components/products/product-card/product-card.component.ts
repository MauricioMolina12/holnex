import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, Signal } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { Product } from '../../../../features/products/models/products.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @Input() horizontal: boolean = false;

  @Output() productClick = new EventEmitter<any>();

  imageLoaded = false;
  isDark!: Signal<boolean>;


  constructor(private themeService: ThemeService) {}
  ngOnInit(): void {
    this.isDark = this.themeService.darkModeSignal;
  }

  onProductClick(product: any): void {
    this.productClick.emit(product);
  }
}
