import { Injectable } from '@angular/core';

/**
 * Validation utilities for auth forms (login, signup, forgot password).
 *
 * Auth state management is handled by `AuthFacade` (core/auth/auth.facade.ts).
 * Do NOT add session/token logic here — use the centralized auth system instead.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthValidationService {

  isEmailValid(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  isMinLength(password: string, minLength: number = 8): boolean {
    return password.length >= minLength;
  }

  hasUpperCase(password: string): boolean {
    return /[A-Z]/.test(password);
  }

  hasLowerCase(password: string): boolean {
    return /[a-z]/.test(password);
  }

  hasNumber(password: string): boolean {
    return /[0-9]/.test(password);
  }

  hasSpecialChar(password: string): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(password);
  }
}
