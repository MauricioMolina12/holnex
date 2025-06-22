import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appZoomImage]',
  standalone: true,
})
export class ZoomImageDirective {
  @Input() zoomFactor: number = 1;
  private imgElement!: HTMLImageElement;
  private zoomContainer!: HTMLDivElement;
  private isBrowser!: boolean;

  mql = window.matchMedia('(max-width: 600px)');

  // Example => <img [src]="mainImage" appZoomImage [zoomFactor]="2" [alt]="product()?.title"

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      if (this.mql.matches) {
        return;
      }
      this.imgElement = this.el.nativeElement as HTMLImageElement;
      this.createZoomElements();
    }
  }

  private createZoomElements() {
    this.zoomContainer = this.renderer.createElement('div');
    this.renderer.setStyle(this.zoomContainer, 'position', 'absolute');
    this.renderer.setStyle(this.zoomContainer, 'width', '400px');
    this.renderer.setStyle(this.zoomContainer, 'height', '400px');
    this.renderer.setStyle(this.zoomContainer, 'min-width', '400px');
    this.renderer.setStyle(this.zoomContainer, 'min-height', '400px');
    this.renderer.setStyle(this.zoomContainer, 'overflow', 'hidden');
    // this.renderer.setStyle(this.zoomContainer, 'display', 'none');
    this.renderer.setStyle(
      this.zoomContainer,
      'background-size',
      `${this.zoomFactor * 100}%`
    );
    this.renderer.setStyle(
      this.zoomContainer,
      'background-repeat',
      'no-repeat'
    );
    this.renderer.setStyle(this.zoomContainer, 'background-position', 'center');
    if (this.document) {
      this.renderer.appendChild(document.body, this.zoomContainer);
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const rect = this.imgElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.renderer.setStyle(this.zoomContainer, 'display', 'block');
    this.renderer.setStyle(this.zoomContainer, 'top', `${event.pageY + 10}px`);
    this.renderer.setStyle(this.zoomContainer, 'left', `${event.pageX + 10}px`);
    this.renderer.setStyle(this.zoomContainer, 'border-radius', '10px');

    this.renderer.setStyle(
      this.zoomContainer,
      'background-image',
      `url(${this.imgElement.src})`
    );
    this.renderer.setStyle(
      this.zoomContainer,
      'background-position',
      `${-(x * this.zoomFactor - 70)}px ${-(y * this.zoomFactor - 70)}px`
    );
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.setStyle(this.zoomContainer, 'display', 'none');
  }
}
