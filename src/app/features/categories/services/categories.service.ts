import { Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  categories$ = signal<any[]>([]);
  categoryDetail$ = signal<any | null>([]);

  constructor(private http: HttpClient) {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.http
      .get<any[]>(environment.api + '/categories')
      .pipe(
        map((response) =>
          response.map((category, index) => ({
            id: index,
            name: category?.name,
            slug: category?.slug,
            image: category?.image,
            creationAt: category?.creationAt,
            updateAt: category?.updateAt
          }))
        ),
        catchError((error) => {
          console.error('Error getAllCategories(): ', error);
          return of([]);
        })
      )
      .subscribe((categories) => this.categories$.set(categories));
  }

  getCategoryById(slug: string): void {
    const foundCategory = this.categories$().find(
      (category) => category?.name?.slug === slug
    );
    if (foundCategory) {
      this.categoryDetail$.set(foundCategory);
      return;
    }

    this.http
      .get<any>(environment.api + `/categories/slug/${slug}`)
      .pipe(
        map((category) => ({
          id: category?.id,
          name: category?.name,
          slug: category?.slug,
          image: category?.image,
        })),
        catchError((error) => {
          console.error('Error getCategoryById(): ', error);
          return of(null);
        })
      )
      .subscribe((category: any) => this.categoryDetail$.set(category));
  }

  getProductsPerCategory(id: string): Observable<any[]> {
    return this.http
      .get<any[]>(`${environment.api}/categories/${id}/products`)
      .pipe(
        map((response) =>
          response.map((product: any) => ({
            id: product?.id,
            title: product?.title,
            slug: product?.slug,
            price: product?.price,
            description: product?.description,
            category: product?.category,
            images: product?.images,
          }))
        ),
        catchError((error) => {
          console.error('Error getProductsPerCategory():', error);
          return of([]); 
        })
      );
  }
}
