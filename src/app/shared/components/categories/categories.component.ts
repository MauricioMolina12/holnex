import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ProductsService } from '../products/products.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgFor],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  constructor(private productsService: ProductsService) {}

  categories: any[] = [];

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((products) => {
      this.categories = products.reduce((acc: string[], product: any) => {
        if (!acc.includes(product.category)) {
          acc.push(product.category);
        }
        return acc;
      }, []); 
    });
  }
  
}
