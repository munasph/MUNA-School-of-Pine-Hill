import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { SchoolInfoService } from './school-info.service';

export interface SeoConfig {
  title: string;
  description: string;
  path?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    private readonly schoolInfo: SchoolInfoService,
    @Inject(DOCUMENT) private readonly doc: Document,
  ) {}

  update({ title, description, path = '/' }: SeoConfig): void {
    const info = this.schoolInfo.snapshot;
    const fullTitle = `${title} | ${info.name}`;
    const url   = `${info.baseUrl}${path}`;
    const image = `${info.baseUrl}/assets/logo-full.png`;

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: description });

    this.meta.updateTag({ property: 'og:title',       content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url',         content: url });
    this.meta.updateTag({ property: 'og:image',       content: image });

    this.meta.updateTag({ name: 'twitter:title',       content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image',       content: image });

    this.setCanonical(url);
  }

  private setCanonical(href: string): void {
    let link = this.doc.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }
}
