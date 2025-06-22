import { NgClass, NgFor } from '@angular/common';
import { Component, computed, Input, OnInit } from '@angular/core';
import { HttpService } from '../../../../core/services/http.service';
import { ProductsService } from '../../../products/services/products.service';
import { map } from 'rxjs';
import { CategoriesService } from '../../services/categories.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories-list',
  standalone: false,
  // imports: [NgFor, RouterLink, NgClass],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss',
})
export class CategoriesListComponent implements OnInit {
  constructor(private categoriesService: CategoriesService) {}

  
  @Input() isAbsolute: boolean = false;
  categories = computed(() => this.categoriesService.categories$());
  loading = computed(()=> !this.categories() || this.categories().length === 0);
  
  ngOnInit() {  
    this.categoriesService.getAllCategories();          
  }
}
