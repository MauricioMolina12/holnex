import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthUser } from '../../shared/models/auth-user.model';

/**
 * Auth credentials for login — extend as needed.
 */
export interface AuthCredentials {
  email: string;
  password: string;
}

/**
 * Standardised response from any auth provider.
 */
export interface AuthResult {
  user: AuthUser;
  token: string;
}

/**
 * Contract that every auth backend must implement.
 *
 * Swap this provider to integrate an external auth frontend
 * (e.g. a micro-frontend, Amplify Hosted UI, or an OAuth redirect app)
 * without touching any consumer code.
 */
export abstract class AuthProvider {
  /** Authenticate with credentials and return user + token. */
  abstract login(credentials: AuthCredentials): Observable<AuthResult>;

  /** End the current session. */
  abstract logout(): Observable<void>;

  /**
   * Check whether a session already exists (cookie, token in storage, etc.)
   * and return the user if so.  Return `null` when there is no active session.
   */
  abstract checkSession(): Observable<AuthResult | null>;

  /** Return the current access / id token, or `null`. */
  abstract getToken(): string | null;
}

/**
 * Injection token — use this in `providers` to bind a concrete implementation:
 *
 * ```ts
 * { provide: AUTH_PROVIDER, useClass: DefaultAuthProvider }
 * ```
 */
export const AUTH_PROVIDER = new InjectionToken<AuthProvider>('AUTH_PROVIDER');
