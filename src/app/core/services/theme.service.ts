import { Injectable, Inject, PLATFORM_ID, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  darkModeSignal = signal<boolean>(false);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.initTheme(); 
      this.listenToSystemPreferenceChanges(); 
    }
  }

  private initTheme() {
    const prefersDark = this.userPrefersDarkTheme();
    this.applyTheme(prefersDark);
  }

  private listenToSystemPreferenceChanges() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      this.applyTheme(e.matches);
    });
  }

  private applyTheme(isDark: boolean) {
    this.document.body.classList.toggle('dark', isDark);
    this.darkModeSignal.set(isDark);
  }

  toggleTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const isCurrentlyDark = this.document.body.classList.contains('dark');
      const newIsDark = !isCurrentlyDark;
      this.applyTheme(newIsDark);
    }
  }

  userPrefersDarkTheme(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  checkDarkMode() {
    if (isPlatformBrowser(this.platformId)) {
      const isDark = this.document.body.classList.contains('dark');
      this.darkModeSignal.set(isDark);
    }
  }
}
