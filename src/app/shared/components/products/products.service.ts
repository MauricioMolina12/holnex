import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: any[] = [];
  productDetail: any;

  // Se debe organizar bien la paginación

  // pagination = {
  //   currentProducts: [],
  //   totalPages: 1,
  //   hasPagination: false,
  //   productPerPage: 6,
  //   currentPage: 1,
  // };

  constructor(private http: HttpClient) {}



  /**
   * Get the general products
   *
   * @returns {Observable<any>} - Returns an observable with an array of all products
   */

  getProducts(): Observable<any> {
    return this.http.get(environment.apiUrl).pipe(
      map((products: any) => {
        return products.map((product: any) => ({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
          description: product.description,
        }));
      }),
      catchError((error) => {
        console.error('Error fetching products:', error);
        return throwError(() => new Error('Failed to fetch products'));
      })
    );
  }

  /**
   * Get the an product with a ID
   *
   * @returns {Observable<any>} - Returns an observable with an object of the product
   */

  getProductBYId(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${id}`).pipe(
      map((product: any) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        description: product.description,
      })),
      catchError((error) => {
        console.error('Error fetching product:', error);
        return throwError(() => new Error('Failed to fetch product'));
      })
    );
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
