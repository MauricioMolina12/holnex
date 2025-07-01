import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private titleService: Title, private metaService: Meta) {}

  setMetaData(...properties: { key: string; value: string }[]) {
    properties.forEach((property) => {
      switch (property.key) {
        case 'name':
          this.setTitle(property.value);
          break;
        case 'description':
          this.setDescription(property.value);
          break;
        case 'keywords':
          this.setKeywords(property.value);
          break;
      }
    });
  }

  setTitle(title: string) {
    this.titleService.setTitle(title);
  }

  setDescription(description: string) {
    this.updateTag('description', description);
  }

  setKeywords(keywords: string) {
    this.updateTag('keywords', keywords);
  }

  setOgTitle(ogTitle: string) {
    this.updateTag('og:title', ogTitle, true);
  }

  setOgDescription(ogDescription: string) {
    this.updateTag('og:description', ogDescription, true);
  }

  setOgImage(ogImage: string) {
    this.updateTag('og:image', ogImage, true);
  }

  setOgUrl(ogUrl: string) {
    this.updateTag('og:url', ogUrl, true);
  }

  private updateTag(name: string, content: string, property: boolean = false) {
    if (property) {
      this.metaService.updateTag({ property: name, content });
    } else {
      this.metaService.updateTag({ name, content });
    }
  }

  default(){
    this.setTitle('');
    this.setDescription('');
    this.setKeywords('');
    this.setOgTitle('');
    this.setOgDescription('');
    this.setOgImage('');
    this.setOgUrl('');
  }
}
