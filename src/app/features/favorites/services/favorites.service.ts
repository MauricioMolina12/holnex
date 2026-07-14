import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Favorite } from '../models/favorites.model';
import { Product } from '../../products/models/products.model';
import { HttpService } from '../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {

  constructor(private httpService: HttpService) {}

  getFavorites(): Observable<Favorite[]> {
    // TODO: Replace with real endpoint when backend is ready
    // return this.httpService.get('/favorites').pipe(
    //   map((res: any) => res.data as Favorite[])
    // );
    return of(this.getMockFavorites());
  }

  addFavorite(productId: string, product?: Product): Observable<Favorite> {
    // TODO: Replace with real endpoint
    // return this.httpService.post('/favorites', { productId }).pipe(
    //   map((res: any) => res.data as Favorite)
    // );
    const favorite: Favorite = {
      productId,
      addedAt: new Date(),
      userId: 'mock-user-id',
      product,
    };
    return of(favorite);
  }

  removeFavorite(productId: string): Observable<string> {
    // TODO: Replace with real endpoint
    // return this.httpService.delete(`/favorites/${productId}`).pipe(
    //   map(() => productId)
    // );
    return of(productId);
  }

  private getMockFavorites(): Favorite[] {
    return [
      {
        productId: '4',
        addedAt: new Date('2026-03-28T10:00:00Z'),
        userId: 'mock-user-id',
        product: {
          id: 4,
          title: 'Chaqueta deportiva impermeable',
          slug: 'chaqueta-deportiva-impermeable',
          price: 85,
          description: 'Chaqueta ligera e impermeable ideal para actividades al aire libre. Diseño moderno con cierre frontal y bolsillos laterales.',
          images: [
            'https://i.imgur.com/QkIa5tT.jpeg',
            'https://i.imgur.com/jb5Yu0h.jpeg',
          ],
          creationAt: '2026-03-01T00:00:00Z',
          updatedAt: '2026-03-15T00:00:00Z',
          category: { id: 1, name: 'Ropa', slug: 'ropa', image: '', creationAt: '', updatedAt: '' },
        },
      },
      {
        productId: '8',
        addedAt: new Date('2026-04-01T14:30:00Z'),
        userId: 'mock-user-id',
        product: {
          id: 8,
          title: 'Auriculares inalámbricos Bluetooth',
          slug: 'auriculares-inalambricos-bluetooth',
          price: 45,
          description: 'Auriculares con cancelación de ruido activa, batería de 30 horas y sonido premium.',
          images: [
            'https://i.imgur.com/Et1RGnP.jpeg',
            'https://i.imgur.com/fpT4052.jpeg',
          ],
          creationAt: '2026-02-20T00:00:00Z',
          updatedAt: '2026-03-10T00:00:00Z',
          category: { id: 2, name: 'Electrónica', slug: 'electronica', image: '', creationAt: '', updatedAt: '' },
        },
      },
      {
        productId: '15',
        addedAt: new Date('2026-04-02T09:00:00Z'),
        userId: 'mock-user-id',
        product: {
          id: 15,
          title: 'Zapatillas running ultraligeras',
          slug: 'zapatillas-running-ultraligeras',
          price: 120,
          description: 'Zapatillas de running con amortiguación reactiva y malla transpirable para máximo rendimiento.',
          images: [
            'https://i.imgur.com/qNOjJje.jpeg',
            'https://i.imgur.com/NjfRlcu.jpeg',
          ],
          creationAt: '2026-01-15T00:00:00Z',
          updatedAt: '2026-03-05T00:00:00Z',
          category: { id: 4, name: 'Zapatos', slug: 'zapatos', image: '', creationAt: '', updatedAt: '' },
        },
      },
    ];
  }
}
