import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { Product } from '../../../features/products/models/products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products$ = signal<Product[]>([]);
  productDetail$ = signal<Product | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.api + '/products').pipe(
      catchError((error) => {
        console.error('ProductsService.getAllProducts() error:', error);
        return throwError(() => error);
      })
    );
  }
  /**
   * Fetches a product by ID and updates the signal
   * @param slug Product slug
   */
  getProductById(slug: string): Observable<Product> {
    return this.http.get<Product>(`${environment.api + '/products/slug/'}${slug}`).pipe(
      catchError((error) => {
        console.error(`Error loading product ${slug}:`, error);
        return throwError(() => error);
      })
    );
  }


  /**
   * Allows you to navigate to the product detail path
   * @param product Product Object
   */
  async detailProduct(product: Product) {
    await this.productDetail$.set(product);
    this.router.navigate([`/product/${product.slug}`]);
  }

  // getProducts(params: {
  //   category?: string;
  //   offer?: boolean;
  //   filter?: string;
  // }): Observable<any[]> {
  //   let url = `${environment.apiUrl}/products`;

  //   // Agrega filtros dinámicamente
  //   const queryParams = [];
  //   if (params.category) queryParams.push(`category=${params.category}`);
  //   if (params.offer) queryParams.push(`offer=${params.offer}`);
  //   if (params.filter) queryParams.push(`filter=${params.filter}`);

  //   if (queryParams.length) {
  //     url += '?' + queryParams.join('&');
  //   }

  //   return this.http.get<any[]>(url).pipe(
  //     map((response) =>
  //       response.map((product) => ({
  //         id: product.id,
  //         title: product.title,
  //         price: product.price,
  //         image: product.image,
  //         category: product.category,
  //         description: product.description,
  //       }))
  //     ),
  //     catchError((error) => {
  //       console.error('Error fetching products:', error);
  //       return throwError(() => new Error('Failed to fetch products'));
  //     })
  //   );
  // }

  // Se debe organizar bien la paginación

  // paginatedProducts(
  //   currentPage: number,
  //   productPerPage: number,
  //   products: any[]
  // ) {
  //   const startIndex = (currentPage - 1) * productPerPage;
  //   const endIndex = startIndex + productPerPage;
  //   this.products = products.slice(startIndex, endIndex);
  // }
}
