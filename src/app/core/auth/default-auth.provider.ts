import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { AuthProvider, AuthCredentials, AuthResult } from './auth-provider';
import { AuthUser } from '../../shared/models/auth-user.model';

const MOCK_USER: AuthUser = {
  id: '1',
  name: 'Alejandro García',
  email: 'alejandro@holnex.com',
  phone: '+52 55 1234 5678',
  avatar: 'https://i.pravatar.cc/150?img=12',
  role: 'buyer',
  countryId: 'MX',
  address: 'Av. Insurgentes Sur 1234, CDMX',
  createdAt: '2024-01-15T00:00:00.000Z',
};

const MOCK_TOKEN = 'mock-jwt-token';
const TOKEN_KEY = 'holnex_auth_token';

/**
 * Mock auth provider for development.
 *
 * Replace with a real provider (e.g. `AmplifyAuthProvider`, `RemoteAuthProvider`)
 * by changing the binding in `app.module.ts`:
 *
 * ```ts
 * { provide: AUTH_PROVIDER, useClass: AmplifyAuthProvider }
 * ```
 */
@Injectable()
export class DefaultAuthProvider extends AuthProvider {

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    super();
    this.isBrowser = isPlatformBrowser(platformId);
  }

  login(_credentials: AuthCredentials): Observable<AuthResult> {
    const result: AuthResult = { user: MOCK_USER, token: MOCK_TOKEN };
    return of(result).pipe(
      delay(600),
      tap(() => this.persistToken(MOCK_TOKEN))
    );
  }

  logout(): Observable<void> {
    return of(undefined).pipe(
      delay(300),
      tap(() => this.clearToken())
    );
  }

  checkSession(): Observable<AuthResult | null> {
    const token = this.getToken();
    if (!token) {
      return of(null);
    }
    // Mock: token exists → return user
    return of({ user: MOCK_USER, token } as AuthResult).pipe(delay(400));
  }

  getToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  private persistToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem(TOKEN_KEY, token);
    }
  }

  private clearToken(): void {
    if (this.isBrowser) {
      localStorage.removeItem(TOKEN_KEY);
    }
  }
}
