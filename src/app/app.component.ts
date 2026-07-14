import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AppService } from './app.service';
import { GlobalLoaderService } from './core/services/global-loader.service';
import { AuthFacade } from './core/auth/auth.facade';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: false
})
export class AppComponent implements OnInit {
  title = 'Holnex';

  constructor(
    private appService: AppService,
    public globalLoaderService: GlobalLoaderService,
    private authFacade: AuthFacade,
    private titleService: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.appService.startApp();
    this.titleService.setTitle(this.title);

    if (isPlatformBrowser(this.platformId)) {
      // Restore session on app startup (browser only)
      this.authFacade.checkSession();
    } else {
      // On the server, mark auth as loaded so guards don't block SSR
      this.authFacade.markAsLoaded();
    }
  }
}
