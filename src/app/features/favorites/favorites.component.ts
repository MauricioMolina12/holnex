import { Component, inject, OnInit, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesFacade } from './facades/favorites.facade';
import { ProductsService } from '../products/services/products.service';
import { Product } from '../products/models/products.model';
import { skeletonType } from '../../core/components/skeleton/skeleton.type.enum';

@Component({
  selector: 'app-favorites',
  standalone: false,
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {

  favoritesFacade = inject(FavoritesFacade);
  private productsService = inject(ProductsService);
  private router = inject(Router);

  skeletonType = skeletonType;

  products: Signal<Product[]> = this.favoritesFacade.products;
  loading: Signal<boolean> = this.favoritesFacade.loading;
  error: Signal<string | null> = this.favoritesFacade.error;
  count: Signal<number> = this.favoritesFacade.count;

  ngOnInit(): void {
    this.favoritesFacade.load();
  }

  removeFavorite(product: Product): void {
    this.favoritesFacade.remove(product.id.toString());
  }

  goToProduct(product: Product): void {
    this.productsService.detailProduct(product);
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
