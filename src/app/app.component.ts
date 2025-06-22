import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AppService } from './app.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { GlobalLoaderService } from './core/services/global-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Horizon';

  constructor(
    private appService: AppService,
    private globalLoaderService: GlobalLoaderService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('load', () => {
        // set the global loader loading to true
        this.globalLoaderService.show();
        // Execute the main function of the app
        this.appService.startApp();

        this.document.body.style.overflow = 'hidden';

        const loader = this.document.getElementById('global-loader');
        if (loader && this.globalLoaderService.isVisible()) {
          this.document.body.style.overflow = 'auto';
          loader.style.transition = 'opacity 300ms ease';
          loader.style.opacity = '0';
          setTimeout(() => {
            loader.remove();
            this.globalLoaderService.hide()
          }, 300);
        }
      });
    } else {
      return;
    }
  }
}
