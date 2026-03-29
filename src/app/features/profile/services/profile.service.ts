import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { HttpService } from '../../../core/services/http.service';
import { AuthUser } from '../../../shared/models/auth-user.model';
import { Order, ProfileStats } from '../models/profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {

  private readonly _user$ = new BehaviorSubject<AuthUser | null>(null);
  private readonly _orders$ = new BehaviorSubject<Order[] | null>(null);
  private readonly _stats$ = new BehaviorSubject<ProfileStats | null>(null);

  readonly user$ = this._user$.asObservable();
  readonly orders$ = this._orders$.asObservable();
  readonly stats$ = this._stats$.asObservable();

  constructor(private http: HttpService) {}

  getProfile(force = false): Observable<AuthUser> {
    if (!force && this._user$.value) {
      return of(this._user$.value);
    }

    return of({
      id: '1',
      name: 'Alejandro García',
      email: 'alejandro@holnex.com',
      phone: '+52 55 1234 5678',
      avatar: 'https://i.pravatar.cc/150?img=12',
      role: 'buyer',
      countryId: 'MX',
      address: 'Av. Insurgentes Sur 1234, CDMX',
      createdAt: '2024-01-15T00:00:00.000Z',
    } as AuthUser).pipe(
      delay(600),
      tap((user) => this._user$.next(user))
    );
  }

  updateProfile(data: Partial<AuthUser>): Observable<AuthUser> {
    const updated = { ...this._user$.value, ...data } as AuthUser;
    return of(updated).pipe(
      delay(800),
      tap((user) => this._user$.next(user))
    );
  }

  getOrders(force = false): Observable<Order[]> {
    if (!force && this._orders$.value) {
      return of(this._orders$.value);
    }
    return of([
      {
        id: '1', orderNumber: 'HLX-2024-001', date: '2024-11-10T14:30:00Z',
        status: 'delivered', total: 1250.00,
        items: [{ productId: 'p1', title: 'Auriculares Bluetooth Pro', image: 'https://picsum.photos/seed/prod1/100/100', quantity: 1, price: 1250.00 }]
      },
      {
        id: '2', orderNumber: 'HLX-2024-002', date: '2024-12-05T10:00:00Z',
        status: 'shipped', total: 3400.00,
        items: [
          { productId: 'p2', title: 'Smartwatch Ultra', image: 'https://picsum.photos/seed/prod2/100/100', quantity: 1, price: 2800.00 },
          { productId: 'p3', title: 'Funda protectora', image: 'https://picsum.photos/seed/prod3/100/100', quantity: 2, price: 300.00 }
        ]
      },
      {
        id: '3', orderNumber: 'HLX-2025-003', date: '2025-01-20T09:15:00Z',
        status: 'processing', total: 890.50,
        items: [{ productId: 'p4', title: 'Teclado mecánico RGB', image: 'https://picsum.photos/seed/prod4/100/100', quantity: 1, price: 890.50 }]
      },
      {
        id: '4', orderNumber: 'HLX-2025-004', date: '2025-02-14T16:45:00Z',
        status: 'pending', total: 550.00,
        items: [{ productId: 'p5', title: 'Mouse inalámbrico', image: 'https://picsum.photos/seed/prod5/100/100', quantity: 1, price: 550.00 }]
      },
      {
        id: '5', orderNumber: 'HLX-2025-005', date: '2025-03-01T11:30:00Z',
        status: 'cancelled', total: 200.00,
        items: [{ productId: 'p6', title: 'Cable USB-C', image: 'https://picsum.photos/seed/prod6/100/100', quantity: 2, price: 100.00 }]
      }
    ] as Order[]).pipe(
      delay(500),
      tap((orders) => this._orders$.next(orders))
    );
  }

  getStats(force = false): Observable<ProfileStats> {
    if (!force && this._stats$.value) {
      return of(this._stats$.value);
    }
    // return this.http.get('/profile/stats');
    return of({
      totalOrders: 5,
      pendingOrders: 2,
      totalSpent: 6290.50,
      savedItems: 8,
    } as ProfileStats).pipe(
      delay(400),
      tap((stats) => this._stats$.next(stats))
    );
  }

  /** Limpia la caché (útil en logout) */
  clearCache(): void {
    this._user$.next(null);
    this._orders$.next(null);
    this._stats$.next(null);
  }
}
