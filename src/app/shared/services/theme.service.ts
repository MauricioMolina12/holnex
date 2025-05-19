import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkModeSubject.asObservable();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkDarkMode();
    }
  }

  checkDarkMode() {
    if (isPlatformBrowser(this.platformId)) {
      const isDark = this.document.body.classList.contains('dark');
      this.darkModeSubject.next(isDark);
    }
  }

  isDark: boolean = false;
  toggleTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const isDarkTheme = this.document.body.classList.contains('dark');
      // this.isDark = !this.isDark;
      (!isDarkTheme) ? this.document.body.classList.add('dark') : this.document.body.classList.remove('dark')
      this.darkModeSubject.next(isDarkTheme);
      
    }
  }
}
