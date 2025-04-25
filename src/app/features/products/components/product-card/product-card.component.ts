import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemeService } from '../../../../shared/services/theme.service';
import { Product } from '../../models/products.model';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit{

  @Input() product!: Product;
  @Input() horizontal: boolean = false;

  @Output() productClick = new EventEmitter<any>(); // => Event to see the detailed

  isDark: boolean = false;

  constructor(private themeService: ThemeService){}

  ngOnInit(): void {    
    this.themeService.darkMode$.subscribe((isDark)=>{
      this.isDark = isDark;
    })    
  }

  onProductClick(product: any): void {
    this.productClick.emit(product);
  }
}
