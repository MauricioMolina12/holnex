import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  Renderer2,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ad } from '../../models/ads';

@Component({
  selector: 'app-hero-image',
  templateUrl: './hero-image.component.html',
  styleUrls: ['./hero-image.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
})
export class HeroImageComponent implements OnInit {
  @Input() sliderAds: Ad[] = []; // Contains the list of ads that will be displayed in the slider.
  @Input() staticAdContent: Ad | null = null;
  @Input() isStatic: boolean = false;
  visibleAds: Ad[] = [];

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  async ngOnInit() {
    if (this.sliderAds.length > 0 && !this.staticAdContent) {
      this.handleSlideChange();
      this.setClassToFirstElement();
      this.handleSlideAutomatic();
    } else if (
      this.sliderAds.length === 0 &&
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
    if (this.currentSlide < this.sliderAds.length - 1) {
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
      this.currentSlide = this.sliderAds.length - 1;
    }
    this.handleSlideChange();
  }

  async setClassToFirstElement() {
    const sliderOptions = this.elRef.nativeElement.querySelectorAll(
      '.hero-slider__option'
    );
    const sliderOptionActive = (await sliderOptions[0]) as HTMLElement;
    this.renderer.addClass(sliderOptionActive, 'active');
  }

  handleSlideAutomatic() {
    let timeChangeSlider = 10000;
    setInterval(() => {
      if (this.currentSlide < this.sliderAds.length - 1) {
        this.currentSlide++;
      } else {
        this.currentSlide = 0;
      }
      this.handleSlideChange();
    }, timeChangeSlider);
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
    const sliderOptionActive = sliderOptions[this.currentSlide] as HTMLElement;
    sliderOptions.forEach((el: HTMLElement) => {
      this.renderer.removeClass(el, 'active');
    });
    this.renderer.addClass(sliderOptionActive, 'active');
    this.setNextItem();
  }

  // moveSlide(imageToActivate: HTMLElement, slider: HTMLElement) {
  //   const imageOffsetLeft = imageToActivate.offsetLeft;
  //   const imageWidth = imageToActivate.offsetWidth;
  //   const sliderWidth = slider.offsetWidth;

  //   const scrollLeft = imageOffsetLeft - sliderWidth / 2 + imageWidth / 2;

  //   slider.scrollTo({
  //     left: scrollLeft,
  //     behavior: 'smooth',
  //   });
  // }

  currentTitle = signal<string>('');
  currentDescription = signal<string>('');
  setNextItem() {
    const currentItem = this.sliderAds[this.currentSlide];
    this.setBackgroundImage('hero', currentItem.imageUrl);
    this.currentTitle.set(currentItem.title);
    this.currentDescription.set(currentItem.description);
  }
}
