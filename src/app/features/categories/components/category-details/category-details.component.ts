import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroBannerComponent } from '../../../../shared/components/hero-banner/hero-banner.component';
import { CategoriesService } from '../../services/categories.service';
import { ProductsModule } from '../../../products/products.module';
import { ProductsGridComponent } from '../../../../shared/components/products/products-grid/products-grid.component';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss',
  standalone: true,
  imports: [HeroBannerComponent, ProductsGridComponent ,ProductsModule],
})
export class CategoryDetailsComponent implements OnInit {
  category = computed(() => this.categoriesService.categoryDetail$());
  productsPerCategory: any[] = [];
  slug: string = '';
  valuesHeroImage: any;

  constructor(
    private categoriesService: CategoriesService,
    private router: ActivatedRoute
  ) {
    effect(() => {
      const category = this.categoriesService.categoryDetail$();
      if (category) {
        this.valuesHeroImage = {
          title: category.name,
          description: 'Descripción de la categoría',
          imageUrl: category.image,
        };
      }
    });
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(async (params) => {
      this.slug = params.get('slug') || '';
      if (this.slug) {
        await this.categoriesService.getCategoryBySlug(this.slug);
        console.log(this.categoriesService.categoryDetail$());
      }
    });
  }
}
