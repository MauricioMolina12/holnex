import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroImageComponent } from '../../../../shared/components/hero-image/hero-image.component';
import { CategoriesService } from '../../services/categories.service';
import { ProductsModule } from '../../../products/products.module';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss',
  standalone: true,
  imports: [HeroImageComponent, ProductsModule],
})
export class CategoryDetailsComponent {
  category = computed(() => this.categoriesService.categoryDetail$());
  productsPerCategory: any[] = [];
  slug: string = '';
  valuesHeroImage: any;

  constructor(private categoriesService: CategoriesService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.slug = params.get('slug') || '';
      if (this.slug) {
        this.categoriesService.getCategoryById(this.slug);
        this.categoriesService.getProductsPerCategory('1').subscribe((products)=>{
          this.productsPerCategory = products;
          console.log("Productos de la categoría: ", this.productsPerCategory);
          
        })
      
        this.valuesHeroImage = {
          image: this.category()?.name?.image || null,
          title: this.category()?.name?.name  || '',
          description: 'Explora nuestra colección de ropa con las últimas tendencias, estilos únicos y opciones para cada ocasión'
        }
      
      }
    });
  }
}
