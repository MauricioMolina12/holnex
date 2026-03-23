import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';

@Directive({ standalone: true, selector: '[appTooltip]' })
export class TooltipDirective implements OnDestroy {
  @Input('appTooltip') tooltipTitle: string = '';
  tooltip: HTMLElement | null = null;
  offset: number = 8;
  fadeDuration = 100;

  private hideTimeout: any;
  private isHiding = false;

  private handleOutsideTouch: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.handleOutsideTouch = this.onOutsideTouch.bind(this);

    document.addEventListener('touchstart', this.handleOutsideTouch);
    document.addEventListener('click', this.handleOutsideTouch);
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.isHiding && this.tooltip) {
      clearTimeout(this.hideTimeout);
      this.isHiding = false;
      this.renderer.setStyle(this.tooltip, 'opacity', '1');
      this.renderer.setStyle(this.tooltip, 'transform', 'scale(1)');
      return;
    }

    if (!this.tooltip && this.tooltipTitle) {
      this.showTooltip();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hideTooltip();
  }

  @HostListener('click')
  @HostListener('touchstart')
  onTouch() {
    if (!this.tooltip) {
      this.showTooltip();
    } else {
      this.hideTooltip();
    }
  }

  private onOutsideTouch(event: Event) {
    if (this.tooltip && !this.el.nativeElement.contains(event.target)) {
      this.hideTooltip();
    }
  }

  private showTooltip() {
    const tooltip = this.renderer.createElement('div') as HTMLElement;

    tooltip.innerText = this.tooltipTitle;

    this.tooltip = tooltip;
    this.renderer.appendChild(document.body, tooltip);

    this.renderer.setStyle(tooltip, 'position', 'absolute');
    this.renderer.setStyle(tooltip, 'background', '#333');
    this.renderer.setStyle(tooltip, 'color', '#fff');
    this.renderer.setStyle(tooltip, 'padding', '6px 10px');
    this.renderer.setStyle(tooltip, 'border-radius', '4px');
    this.renderer.setStyle(tooltip, 'font-size', '12px');
    this.renderer.setStyle(tooltip, 'white-space', 'nowrap');
    this.renderer.setStyle(tooltip, 'pointer-events', 'none');
    this.renderer.setStyle(tooltip, 'z-index', '1000');
    this.renderer.setStyle(tooltip, 'opacity', '0');
    this.renderer.setStyle(tooltip, 'transform', 'scale(0.9)');
    this.renderer.setStyle(
      tooltip,
      'transition',
      `opacity ${this.fadeDuration}ms, transform ${this.fadeDuration}ms`
    );

    requestAnimationFrame(() => {
      if (!this.tooltip) return;

      this.setPosition();
      this.renderer.setStyle(tooltip, 'opacity', '1');
      this.renderer.setStyle(tooltip, 'transform', 'scale(1)');
    });
  }

  private setPosition() {
    if (!this.tooltip) return;

    const hostRect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltip.getBoundingClientRect();

    const spaceAbove = hostRect.top;
    const spaceBelow = window.innerHeight - hostRect.bottom;
    const placeAbove = spaceAbove > spaceBelow;

    let top: number;
    if (placeAbove) {
      top = window.scrollY + hostRect.top - tooltipRect.height - this.offset;
    } else {
      top = window.scrollY + hostRect.bottom + this.offset;
    }

    let left =
      window.scrollX +
      hostRect.left +
      hostRect.width / 2 -
      tooltipRect.width / 2;

    const margin = 12;

    const overflowRight = left + tooltipRect.width + margin > window.innerWidth;
    const overflowLeft = left < margin;

    if (overflowRight) {
      left = window.innerWidth - tooltipRect.width - margin;
    } else if (overflowLeft) {
      left = margin;
    }

    this.renderer.setStyle(this.tooltip, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }

  private hideTooltip() {
    if (this.tooltip && !this.isHiding) {
      this.isHiding = true;
      this.renderer.setStyle(this.tooltip, 'opacity', '0');
      this.renderer.setStyle(this.tooltip, 'transform', 'scale(0.9)');

      this.hideTimeout = setTimeout(() => {
        if (this.tooltip) {
          this.renderer.removeChild(document.body, this.tooltip);
          this.tooltip = null;
          this.isHiding = false;
        }
      }, this.fadeDuration);
    }
  }

  ngOnDestroy() {
    if (this.hideTimeout) clearTimeout(this.hideTimeout);
    this.hideTooltip();

    document.removeEventListener('touchstart', this.handleOutsideTouch);
    document.removeEventListener('click', this.handleOutsideTouch);
  }
}
