import { Component, inject, Input, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrl: './share.component.scss',
  standalone: false,
})
export class ShareComponent {
  @Input() productUrl: string = '';
  @Input() productTitle: string = '';

  linkCopied = signal(false);

  private platformId = inject(PLATFORM_ID);

  get shareUrl(): string {
    if (this.productUrl) return this.productUrl;
    if (isPlatformBrowser(this.platformId)) return window.location.href;
    return '';
  }

  copyLink() {
    if (!isPlatformBrowser(this.platformId)) return;
    navigator.clipboard.writeText(this.shareUrl).then(() => {
      this.linkCopied.set(true);
      setTimeout(() => this.linkCopied.set(false), 2500);
    });
  }

  shareWhatsApp() {
    const text = this.productTitle
      ? `${this.productTitle} - ${this.shareUrl}`
      : this.shareUrl;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  }

  shareTwitter() {
    const text = this.productTitle || 'Mira este producto';
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(this.shareUrl)}`,
      '_blank'
    );
  }

  shareInstagram() {
    navigator.clipboard.writeText(this.shareUrl).then(() => {
      this.linkCopied.set(true);
      setTimeout(() => this.linkCopied.set(false), 2500);
    });
    window.open('https://www.instagram.com/', '_blank');
  }
}
