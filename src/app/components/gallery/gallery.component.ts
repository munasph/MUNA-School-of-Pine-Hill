import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Filter, Play, LucideIconData } from 'lucide-angular';

import type {
  GalleryImage, GalleryCategory, VideoHighlight,
} from '../../models/gallery.model';
import { GalleryService } from '../../services/gallery.service';
import { GALLERY_COPY } from './gallery.data';
import { SeoService } from '../../services/seo.service';

type Category = GalleryCategory;

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit, OnDestroy {
  allImages:         GalleryImage[]            = [];
  galleryCategories: readonly GalleryCategory[] = [];
  videoHighlights:   VideoHighlight[]          = [];

  readonly filterIcon: LucideIconData = Filter;
  readonly playIcon:   LucideIconData = Play;

  activeFilter: Category = 'All';
  selectedIndex: number | null = null;

  readonly t = GALLERY_COPY;
  private subs = new Subscription();

  constructor(
    private readonly galleryService: GalleryService,
    private readonly seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.galleryService.getContent().subscribe((c) => {
        this.allImages         = c.images;
        this.galleryCategories = c.categories;
        this.videoHighlights   = c.videos;
      }),
    );

    this.seo.update({
      title:       'Gallery',
      description: 'Gallery placeholder. Add your photos and videos when ready.',
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
