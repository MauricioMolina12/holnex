import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  user: any;
  isLoggued: boolean = true;

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
