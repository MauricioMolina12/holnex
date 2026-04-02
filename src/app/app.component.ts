import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AppService } from './app.service';
import { GlobalLoaderService } from './core/services/global-loader.service';
import { AuthFacade } from './core/auth/auth.facade';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: false
})
export class AppComponent implements OnInit {
  title = 'Horizon';

  constructor(
    private appService: AppService,
    public globalLoaderService: GlobalLoaderService,
    private authFacade: AuthFacade,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.appService.startApp();

    // Restore session on app startup (browser only)
    if (isPlatformBrowser(this.platformId)) {
      this.authFacade.checkSession();
    }
  }
}
