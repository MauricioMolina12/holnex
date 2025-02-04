import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ProductsService } from '../products/products.service';
import { map } from 'rxjs';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  constructor(private categoriesService: CategoriesService) {}

  categories: any[] = [];

  ngOnInit() {
    this.categoriesService.categories$.subscribe((categories) => {
      this.categories = categories;
    });
    if (this.categories.length === 0) this.categoriesService.getCategories();
  }
}
