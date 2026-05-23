import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Filter, Play, LucideIconData } from 'lucide-angular';
import { allImages, galleryCategories } from '../../data/gallery';
import type { GalleryImage } from '../../lib/types';
import { TranslationService } from '../../services/translation.service';
import { SeoService } from '../../services/seo.service';
import type { Translations } from '../../translations/en';

type Category = (typeof galleryCategories)[number];

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit, OnDestroy {
  readonly allImages         = allImages;
  readonly galleryCategories = galleryCategories;
  readonly filterIcon: LucideIconData = Filter;
  readonly playIcon:   LucideIconData = Play;

  readonly videoHighlights = [
    { title: 'Campus Tour 2025',           seed: 'video-thumb-1' },
    { title: 'Annual Day Highlights 2025', seed: 'video-thumb-2' },
  ];

  activeFilter: Category = 'All';
  selectedIndex: number | null = null;

  t!: Translations;
  private subs = new Subscription();

  constructor(
    private readonly translation: TranslationService,
    private readonly seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.t = this.translation.t;
    this.subs.add(this.translation.t$.subscribe((v) => (this.t = v)));

    this.seo.update({
      title:       'Gallery',
      description: 'Browse photos and videos from events, classrooms, and campus life.',
      path:        '/gallery',
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  get filtered(): GalleryImage[] {
    return this.activeFilter === 'All'
      ? this.allImages
      : this.allImages.filter((img) => img.category === this.activeFilter);
  }

  categoryLabel(cat: Category): string {
    const map: Partial<Record<Category, string>> = {
      All:       this.t.gallery.all,
      Events:    this.t.gallery.events,
    };
    return map[cat] ?? cat;
  }

  setFilter(c: Category): void {
    this.activeFilter = c;
  }

  trackImage(_: number, i: GalleryImage): number {
    return i.id;
  }

  videoThumb(seed: string): string {
    return `https://picsum.photos/seed/${seed}/800/450`;
  }

  open(i: number): void { this.selectedIndex = i; }
  close(): void { this.selectedIndex = null; }
  prev(): void {
    if (this.selectedIndex === null) return;
    const len = this.filtered.length;
    this.selectedIndex = (this.selectedIndex - 1 + len) % len;
  }
  next(): void {
    if (this.selectedIndex === null) return;
    this.selectedIndex = (this.selectedIndex + 1) % this.filtered.length;
  }
}
