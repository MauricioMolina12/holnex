import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemeService } from '../../../../shared/services/theme.service';
import { Product } from '../../models/products.model';

@Component({
  selector: 'app-card-product',
  standalone: false,
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss'
})
export class CardProductComponent implements OnInit{

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
