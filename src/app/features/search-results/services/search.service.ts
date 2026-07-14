import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { SearchParams, SearchResponse } from '../models/search.model';
import { Product } from '../../products/models/products.model';
import { HttpService } from '../../../core/services/http.service';

@Injectable({ providedIn: 'root' })
export class SearchService {

  constructor(private httpService: HttpService) {}

  search(params: SearchParams): Observable<SearchResponse> {
    // TODO: Replace with real endpoint
    // return this.httpService.post('/search', params).pipe(
    //   map((res: any) => res.data as SearchResponse)
    // );
    return this.mockSearch(params);
  }

  private mockSearch(params: SearchParams): Observable<SearchResponse> {
    let products = this.getMockProducts();

    // Filter by query
    if (params.query) {
      const q = params.query.toLowerCase();
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.name.toLowerCase().includes(q)
      );
    }

    // Filter by categories
    if (params.filters.categories.length) {
      products = products.filter((p) =>
        params.filters.categories.includes(p.category.name)
      );
    }

    // Filter by price range
    if (params.filters.priceMin !== null) {
      products = products.filter((p) => p.price >= params.filters.priceMin!);
    }
    if (params.filters.priceMax !== null) {
      products = products.filter((p) => p.price <= params.filters.priceMax!);
    }

    // Filter by condition
    if (params.filters.condition.length) {
      // Mock: even IDs = "Nuevo", odd = "Usado"
      products = products.filter((p) => {
        const cond = p.id % 2 === 0 ? 'Nuevo' : 'Usado';
        return params.filters.condition.includes(cond);
      });
    }

    // Sort
    switch (params.sort) {
      case 'price_asc':
        products = [...products].sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        products = [...products].sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        products = [...products].sort(
          (a, b) => new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime()
        );
        break;
    }

    // Count categories before pagination
    const categoryMap = new Map<string, number>();
    products.forEach((p) => {      
      const count = categoryMap.get(p.category.name) || 0;
      categoryMap.set(p.category.name, count + 1);
    });
    const availableCategories = Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      count,
    }));

    // Paginate
    const totalResults = products.length;
    const totalPages = Math.ceil(totalResults / params.pageSize);
    const start = (params.page - 1) * params.pageSize;
    const paged = products.slice(start, start + params.pageSize);

    const response: SearchResponse = {
      products: paged,
      meta: {
        totalResults,
        totalPages,
        currentPage: params.page,
        pageSize: params.pageSize,
      },
      availableCategories,
    };

    return of(response).pipe(delay(400));
  }

  private getMockProducts(): Product[] {
    const categories = [
      { id: 1, name: 'Ropa', slug: 'ropa', image: '', creationAt: '', updatedAt: '' },
      { id: 2, name: 'Electrónica', slug: 'electronica', image: '', creationAt: '', updatedAt: '' },
      { id: 3, name: 'Hogar', slug: 'hogar', image: '', creationAt: '', updatedAt: '' },
      { id: 4, name: 'Zapatos', slug: 'zapatos', image: '', creationAt: '', updatedAt: '' },
      { id: 5, name: 'Accesorios', slug: 'accesorios', image: '', creationAt: '', updatedAt: '' },
    ];

    const titles = [
      'Camiseta básica algodón', 'Auriculares Bluetooth Pro', 'Lámpara LED escritorio',
      'Zapatillas running ultra', 'Reloj inteligente Sport', 'Chaqueta impermeable',
      'Parlante portátil 360', 'Silla ergonómica office', 'Botas cuero premium',
      'Gafas de sol polarizadas', 'Pantalón cargo slim', 'Tablet 10 pulgadas',
      'Mochila viajera 40L', 'Tenis casual urbano', 'Smartband fitness',
      'Sudadera hoodie oversize', 'Cargador inalámbrico dual', 'Organizador escritorio bambú',
      'Sandalias deportivas flex', 'Collar minimalista acero', 'Bermuda denim stretch',
      'Mouse ergonómico wireless', 'Set vasos cristal x6', 'Mocasines gamuza',
      'Pulsera cuero trenzada', 'Polo manga larga piqué', 'Powerbank 20000mAh',
      'Almohada memory foam', 'Sneakers plataforma', 'Billetera compacta RFID',
    ];

    const images = [
      ['https://i.imgur.com/QkIa5tT.jpeg', 'https://i.imgur.com/jb5Yu0h.jpeg'],
      ['https://i.imgur.com/Et1RGnP.jpeg', 'https://i.imgur.com/fpT4052.jpeg'],
      ['https://i.imgur.com/qNOjJje.jpeg', 'https://i.imgur.com/NjfRlcu.jpeg'],
      ['https://i.imgur.com/ZANVnHE.jpeg', 'https://i.imgur.com/Qphac99.jpeg'],
      ['https://i.imgur.com/cHddUCu.jpeg', 'https://i.imgur.com/CFOjAgK.jpeg'],
    ];

    return titles.map((title, i) => ({
      id: i + 1,
      title,
      slug: title.toLowerCase().replace(/\s+/g, '-').replace(/[áéíóú]/g, (c) =>
        ({ á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' } as any)[c] || c
      ),
      price: Math.floor(Math.random() * 200) + 15,
      description: `${title} de alta calidad con materiales premium. Diseño moderno y funcional para uso diario.`,
      images: images[i % images.length],
      creationAt: new Date(2026, 0, i + 1).toISOString(),
      updatedAt: new Date(2026, 3, 1).toISOString(),
      category: categories[i % categories.length],
    }));
  }
}
