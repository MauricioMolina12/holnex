import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  ViewChildren,
  QueryList,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ad } from '../../models/ads';
import { ButtonComponent } from '../ui/button/button.component';

@Component({
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
})
export class HeroBannerComponent implements OnInit {
  @Input() slider: Ad[] = [];
  @Input() staticAdContent: Ad | null = null;
  @Input() isStatic: boolean = false;

  @ViewChildren('slideRef') slideElements!: QueryList<ElementRef>;

  visibleAds: Ad[] = [];
  currentSlide = 0;
  intervalId: any;

  currentTitle = signal<string>('');
  currentDescription = signal<string>('');

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (
      isPlatformBrowser(this.platformId) &&
      this.slider.length > 0 &&
      !this.isStatic
    ) {
      this.defaultSlide();
      this.startSlider();
    }
  }

  startSlider() {
    this.intervalId = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slider.length;
      const currentAd = this.slider[this.currentSlide];
      this.visibleAds = [currentAd];
      this.currentTitle.set(currentAd.title);
      this.currentDescription.set(currentAd.description);

      setTimeout(() => {
        const slide = this.slideElements.get(0)?.nativeElement;
        if (slide) {
          this.setBackgroundImage(slide, currentAd.imageUrl);
        }
      });
    }, 5000);
  }

  toggleSlide: boolean = true;
  toggleSlider() {
    this.toggleSlide = !this.toggleSlide;
    !this.toggleSlide ? clearInterval(this.intervalId) : this.startSlider();
  }

  defaultSlide() {
    const firstAd = this.slider[0];
    this.visibleAds = [firstAd];
    this.currentTitle.set(firstAd.title);
    this.currentDescription.set(firstAd.description);

    setTimeout(() => {
      const slide = this.slideElements.get(0)?.nativeElement;
      if (slide) {
        this.setBackgroundImage(slide, firstAd.imageUrl);
      }
    });
  }

  setBackgroundImage(element: HTMLElement, image: string) {
    this.renderer.setStyle(element, 'backgroundImage', `url('${image}')`);
  }

  prevSlide() {
    if (this.slider.length === 0) return;
    this.currentSlide =
      this.currentSlide === 0 ? this.slider.length - 1 : this.currentSlide - 1;
    this.updateSlide();
  }

  nextSlide() {
    if (this.slider.length === 0) return;
    this.currentSlide =
      this.currentSlide === this.slider.length - 1 ? 0 : this.currentSlide + 1;
    this.updateSlide();
  }

  private updateSlide() {
    const currentAd = this.slider[this.currentSlide];
    this.visibleAds = [currentAd];
    this.currentTitle.set(currentAd.title);
    this.currentDescription.set(currentAd.description);

    setTimeout(() => {
      const slide = this.slideElements.get(0)?.nativeElement;
      if (slide) {
        this.setBackgroundImage(slide, currentAd.imageUrl);
      }
    });
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
