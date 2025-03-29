import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventEmitter } from 'stream';
import { Ad } from '../../models/ads';

@Component({
  selector: 'app-hero-image',
  templateUrl: './hero-image.component.html',
  styleUrls: ['./hero-image.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class HeroImageComponent implements OnInit {
  // Props

  constructor(private elRef: ElementRef, private renderer: Renderer2){}

  ngOnInit(): void {
    this.setBackgroundImage('hero-container', this.values?.image)
  }

  setBackgroundImage = (containerClass: string, image: string) => {
    const slider = this.elRef.nativeElement.querySelector(`.${containerClass}`);
    if (slider) {
      this.renderer.setStyle(slider, 'backgroundImage', `url('${image}')`);
    }
  };
  


  /*------------------- DATA -------------------*/
  @Input() values: any = {}; // Contains the list of ads that will be displayed in the slider.

  // /*------------------- Behavior -------------------*/
  // @Input() autoSlide: boolean = true; /* 
  // Defines whether the slider should advance automatically between ads.
  // Example:
  //   true => The slider moves by itself.
  //   false => The user must advance manually. */

  // @Input() slideInterval: number = 5000; /* 
  // Sets the time interval (in milliseconds) between each automatic ad change.
  // Example:
  //   5000 => Changes every 5 seconds.
  //   Only takes effect if autoSlide is true. 
  // */

  // @Input() loop: boolean = true; /*
  // Indicates whether the slider should restart when it reaches the last ad.
  // Example:
  //   true => After the last ad, it returns to the first one.
  //   false => It stops at the last ad.
  // */
  // @Input() pauseOnHover: boolean = true; /*
  // Allows you to pause the auto-sliding when the user hovers over the slider.
  // Example:
  //   true => Pauses the slider on hover.
  //   false => The slider does not stop.
  // */

  // /*------------------- Design -------------------*/

  // @Input() showIndicators: boolean = true; /* 
  // Determines whether indicators (dots or lines) are displayed to navigate between ads.
  // Example:
  //   true => Display indicators.
  //   false => Do not display indicators.
  // */
  // @Input() showControls: boolean = true; /*
  // Defines whether control buttons (arrows) are displayed to manually advance or rewind.
  // Example:
  //   true => Show controls.
  //   false => Do not show controls.
  // */
  // @Input() indicatorPosition: 'top' | 'bottom' | 'inside' = 'bottom'; /* 
  // Sets the position of the indicators on the slider.
  // Options:
  //   'top' => Indicators above the slider.
  //   'bottom' => Indicators below the slider.
  //   'inside' => Indicators above the images, in a corner.
  // */
  // @Input() height: string = '300px'; /*
  // Controls the height of the slider.
  // Example:
  //   '300px' => The slider will be 300px tall.
  //   '50%' => The height will be 50% of the parent container.
  // */
  // @Input() width: string = '100%'; /*
  // Controls the width of the slider.
  // Example:
  //   '100%' => The slider takes up 100% of the width of the container.
  //   '800px' => The slider has a fixed width of 800px.
  // */




  // /*------------------- Events -------------------*/
  // @Output() adClick = new EventEmitter<any>(); /*
  // Emits an event when the user clicks on an ad.
  // Usage:
  //   Used to capture the selected ad and redirect ===> the user or perform some action.
  
  // */
  // @Output() slideChange = new EventEmitter<any>(); /*
  // Emits an event when the slider changes ads.
  // Usage:
  //   Can be useful for tracking which ad is currently visible.
  // */

  // currentSlide: number = 0;

  // ngOnInit(): void {}

  // onAdClick(ad: Ad) {
  //   this.adClick.emit(ad);
  // }

  // nextSlide() {
  //   if (this.currentSlide < this.ads.length - 1 || this.loop) {
  //     this.currentSlide = (this.currentSlide + 1) % this.ads.length;
  //     this.slideChange.emit(this.currentSlide);
  //   }
  // }

  // previousSlide() {
  //   if (this.currentSlide > 0 || this.loop) {
  //     this.currentSlide =
  //       (this.currentSlide - 1 + this.ads.length) % this.ads.length;
  //     this.slideChange.emit(this.currentSlide);
  //   }
  // }
}
