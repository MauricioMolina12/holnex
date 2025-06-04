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
  @Input() slider: Ad[] = []; // Contains the list of ads that will be displayed in the slider.
  @Input() staticAdContent: Ad | null = null;
  @Input() isStatic: boolean = false;

  visibleAds: Ad[] = [];

  currentTitle = signal<string>('');
  currentDescription = signal<string>('');

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async ngOnInit() {
    if (this.slider.length > 0 && !this.staticAdContent) {
      this.handleSlideChange();
      this.setClassToFirstElement();
      this.handleSlideAutomatic();
    } else if (
      this.slider.length === 0 &&
      this.isStatic &&
      this.staticAdContent
    ) {
      this.setBackgroundImage(
        'hero-slider__option-static',
        this.staticAdContent.imageUrl
      );
    }
  }

  setBackgroundImage = (containerClass: string, image: string) => {
    const hero = this.elRef.nativeElement.querySelector(`.${containerClass}`);
    if (hero) {
      this.renderer.setStyle(hero, 'backgroundImage', `url('${image}')`);
    }
  };

  currentSlide: number = 0;
  nextSlide() {
    if (this.currentSlide < this.slider.length - 1) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }
    this.handleSlideChange();
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else if (this.currentSlide === 0) {
      this.currentSlide = this.slider.length - 1;
    }
    this.handleSlideChange();
  }

  async setClassToFirstElement() {
    const sliderOptions = this.elRef.nativeElement.querySelectorAll(
      '.hero-slider__option'
    );
    const sliderOptionActive = (await sliderOptions[0]) as HTMLElement;
    if (sliderOptionActive) {
      this.renderer.addClass(sliderOptionActive, 'active');
    }
  }

  handleSlideAutomatic() {
    if (isPlatformBrowser(this.platformId)) {
      let timeChangeSlider = 10000;
      setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % this.slider.length;
        this.handleSlideChange();
      }, timeChangeSlider);
    }
  }

  updateSlide() {
    this.handleSlideChange();
  }

  updateSlideWithId(id: number) {
    this.currentSlide = id;
    this.handleSlideChange();
  }

  handleSlideChange() {
    const sliderOptions = this.elRef.nativeElement.querySelectorAll(
      '.hero-slider__option'
    );
    sliderOptions.forEach((el: HTMLElement) => {
      this.renderer.removeClass(el, 'active');
    });
    const sliderOptionActive = sliderOptions[this.currentSlide] as HTMLElement;
    if (sliderOptionActive) {
      this.renderer.addClass(sliderOptionActive, 'active');
      this.setNextItem();
    }
  }
  setNextItem() {
    const currentItem = this.slider[this.currentSlide];
    this.setBackgroundImage('hero', currentItem.imageUrl);
    this.currentTitle.set(currentItem.title);
    this.currentDescription.set(currentItem.description);
  }
  
}
