import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnInit,
  OnDestroy,
  Output,
  Signal,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
    selector: 'app-promo-banner',
    templateUrl: './promo-banner.component.html',
    styleUrls: ['./promo-banner.component.scss'],
    imports: [RouterModule, CommonModule]
})
export class PromoBannerComponent implements OnInit, OnDestroy {
  isDark!: Signal<boolean>;
  @Output() closePromoBanner = new EventEmitter<boolean>(false);

  promos: string[] = [
    '✨ En Holnex tenemos el 40% en todos los productos por el Black Friday.</a>',
    '🎁 Compra ahora y llévate envío gratis en tu primera compra.</a>',
    '🔥 Promoción limitada: 2x1 en productos seleccionados.</a>',
  ];

  currentIndex = 0;
  currentPromo = this.promos[0];
  private intervalId: any;
  private isBrowser = false;
  isExiting = false; 

  constructor(
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.isDark = this.themeService.darkModeSignal;

    if (this.isBrowser) {
      this.intervalId = setInterval(() => this.nextPromo(), 10000);
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  nextPromo(): void {

    this.isExiting = true;

    setTimeout(() => {
      this.isExiting = false;
      this.currentIndex = (this.currentIndex + 1) % this.promos.length;
      this.currentPromo = this.promos[this.currentIndex];
    }, 400); 
  }

  closeBanner(): void {
    this.closePromoBanner.emit(true);
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
