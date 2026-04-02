import { Injectable, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthCredentials } from './auth-provider';
import {
  checkSession,
  login,
  logout,
} from '../../store/user/user.actions';
import {
  selectAuthError,
  selectAuthLoaded,
  selectAuthLoading,
  selectAuthUser,
  selectIsAuthenticated,
} from '../../store/user/user.selectors';
import { AuthUser } from '../../shared/models/auth-user.model';

/**
 * Facade that every component uses to interact with auth.
 *
 * - Exposes **signals** for template binding (no async pipe needed).
 * - Delegates to NgRx store — components never dispatch actions directly.
 * - SSR-safe: no `window` / `localStorage` access here.
 */
@Injectable({ providedIn: 'root' })
export class AuthFacade {

  /** Current authenticated user, or `null`. */
  readonly currentUser: Signal<AuthUser | null>;

  /** Whether a valid session exists. */
  readonly isAuthenticated: Signal<boolean>;

  /** True while any auth operation is in flight. */
  readonly isLoading: Signal<boolean>;

  /** True once the initial session check has completed (success or failure). */
  readonly isLoaded: Signal<boolean>;

  /** Last auth error message, or `null`. */
  readonly error: Signal<string | null>;

  constructor(
    private store: Store,
    private router: Router,
  ) {
    this.currentUser     = toSignal(this.store.select(selectAuthUser),          { initialValue: null  });
    this.isAuthenticated = toSignal(this.store.select(selectIsAuthenticated),   { initialValue: false });
    this.isLoading       = toSignal(this.store.select(selectAuthLoading),       { initialValue: false });
    this.isLoaded        = toSignal(this.store.select(selectAuthLoaded),        { initialValue: false });
    this.error           = toSignal(this.store.select(selectAuthError),         { initialValue: null  });
  }

  /** Call once at app startup (e.g. in AppComponent or APP_INITIALIZER). */
  checkSession(): void {
    this.store.dispatch(checkSession());
  }

  /** Authenticate with email + password. */
  login(credentials: AuthCredentials): void {
    this.store.dispatch(login({ credentials }));
  }

  /** End session + navigate to login. */
  logout(): void {
    this.store.dispatch(logout());
    this.router.navigate(['/user/login']);
  }
}
