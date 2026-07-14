import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { AuthProvider, AuthCredentials, AuthResult } from './auth-provider';
import { AuthUser, UserRole } from '../../shared/models/auth-user.model';

const MOCK_BUYER: AuthUser = {
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

const MOCK_SELLER: AuthUser = {
  id: '2',
  name: 'María López',
  email: 'maria@holnex.com',
  phone: '+52 55 9876 5432',
  avatar: 'https://i.pravatar.cc/150?img=32',
  role: 'seller',
  countryId: 'MX',
  address: 'Calle Reforma 567, Guadalajara',
  createdAt: '2023-11-20T00:00:00.000Z',
};

const MOCK_USERS: Record<UserRole, AuthUser> = {
  buyer: MOCK_BUYER,
  seller: MOCK_SELLER,
  admin: { ...MOCK_BUYER, id: '3', role: 'admin', name: 'Admin Holnex', email: 'admin@holnex.com' },
};

const MOCK_TOKEN = 'mock-jwt-token';
const TOKEN_KEY = 'holnex_auth_token';
const ROLE_KEY  = 'holnex_mock_role';

/**
 * Set to `true` to start logged-in automatically (dev convenience).
 * Set to `false` to require manual login via /user/login.
 */
const AUTO_LOGIN = true;
const AUTO_LOGIN_ROLE: UserRole = 'seller';

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

    // Auto-login: persist token + role so checkSession() finds a session
    if (AUTO_LOGIN && this.isBrowser && !localStorage.getItem(TOKEN_KEY)) {
      localStorage.setItem(TOKEN_KEY, MOCK_TOKEN);
      localStorage.setItem(ROLE_KEY, AUTO_LOGIN_ROLE);
    }
  }

  /**
   * Returns the mock user for the currently selected role.
   * Change the role in localStorage (`holnex_mock_role`) or call `mockLoginAs()`.
   */
  private getMockUser(): AuthUser {
    const role = (this.isBrowser && localStorage.getItem(ROLE_KEY) as UserRole) || 'seller';
    return MOCK_USERS[role] ?? MOCK_USERS['buyer'];
  }

  login(_credentials: AuthCredentials): Observable<AuthResult> {
    const user = this.getMockUser();
    const result: AuthResult = { user, token: MOCK_TOKEN };
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
    const user = this.getMockUser();
    return of({ user, token } as AuthResult).pipe(delay(400));
  }

  getToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Quick mock login: stores token + role and returns the AuthResult.
   * Use via `AuthFacade.mockLoginAs('seller')`.
   */
  override mockLoginAs(role: UserRole): Observable<AuthResult> {
    if (this.isBrowser) {
      localStorage.setItem(ROLE_KEY, role);
    }
    const user = MOCK_USERS[role];
    const result: AuthResult = { user, token: MOCK_TOKEN };
    return of(result).pipe(
      delay(300),
      tap(() => this.persistToken(MOCK_TOKEN))
    );
  }

  private persistToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem(TOKEN_KEY, token);
    }
  }

  private clearToken(): void {
    if (this.isBrowser) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(ROLE_KEY);
    }
  }
}
