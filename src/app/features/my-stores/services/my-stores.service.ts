import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { HttpService } from '../../../core/services/http.service';
import { Store, StoreProduct } from '../models/my-stores.model';
import { MOCK_STORES, MOCK_STORE_PRODUCTS } from '../data/my-stores.mock';

@Injectable({ providedIn: 'root' })
export class MyStoresService {
  private readonly basePath = '/stores';
  private readonly useMock = true;

  constructor(private httpService: HttpService) {}

  // ─── Stores ───────────────────────────────────────────────

  getStores(): Observable<Store[]> {
    return of(MOCK_STORES);
  }

  getStoreBySlug(slug: string): Observable<Store> {
    if (this.useMock) {
      const store = MOCK_STORES.find((s: Store) => s.slug === slug);
      return of(store!).pipe(delay(300));
    }
    return this.httpService.get(`${this.basePath}/${slug}`) as unknown as Observable<Store>;
  }

  createStore(payload: Partial<Store>): Observable<Store> {
    return this.httpService.post(this.basePath, payload) as unknown as Observable<Store>;
  }

  updateStore(storeId: string, payload: Partial<Store>): Observable<Store> {
    return this.httpService.put(`${this.basePath}/${storeId}`, payload) as unknown as Observable<Store>;
  }

  // ─── Store Products ───────────────────────────────────────

  getStoreProducts(storeId: string): Observable<{ products: StoreProduct[]; totalCount: number }> {
    if (this.useMock) {
      const products = MOCK_STORE_PRODUCTS.filter((p: StoreProduct) => p.storeId === storeId);
      return of({ products, totalCount: products.length }).pipe(delay(500));
    }
    return this.httpService.get(`${this.basePath}/${storeId}/products`) as unknown as Observable<{ products: StoreProduct[]; totalCount: number }>;
  }

  getProductById(storeId: string, productId: string): Observable<StoreProduct> {
    return this.httpService.get(`${this.basePath}/${storeId}/products/${productId}`) as unknown as Observable<StoreProduct>;
  }

  createProduct(storeId: string, product: Partial<StoreProduct>): Observable<StoreProduct> {
    return this.httpService.post(`${this.basePath}/${storeId}/products`, product) as unknown as Observable<StoreProduct>;
  }

  updateProduct(storeId: string, productId: string, changes: Partial<StoreProduct>): Observable<StoreProduct> {
    return this.httpService.put(`${this.basePath}/${storeId}/products/${productId}`, changes) as unknown as Observable<StoreProduct>;
  }

  deleteProduct(storeId: string, productId: string): Observable<void> {
    return this.httpService.delete(`${this.basePath}/${storeId}/products/${productId}`) as unknown as Observable<void>;
  }
}
