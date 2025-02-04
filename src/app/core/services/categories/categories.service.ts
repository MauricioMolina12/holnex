import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private categoriesSubject = new BehaviorSubject<any[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCategories(): void {
    this.http
      .get<any[]>('https://fakestoreapi.com/products/categories')
      .pipe(
        map((response) =>
          response.map((category, index) => ({
            id: index,
            name: category,
          }))
        ),
        catchError((error) => {
          return throwError(() => new Error('Failed to fetch categories'));
        })
      )
      .subscribe((categories) => this.categoriesSubject.next(categories));
  }
}
