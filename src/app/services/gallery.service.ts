import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';

import type {
  GalleryContent, GalleryImage, GalleryCategory, VideoHighlight,
} from '../models/gallery.model';
import {
  allImages, galleryCategories, videoHighlights,
} from '../components/gallery/gallery.data';

@Injectable({ providedIn: 'root' })
export class GalleryService {
  private readonly endpoint = '/api/gallery';

  constructor(private readonly http: HttpClient) {}

  getContent(): Observable<GalleryContent> {
    return of<GalleryContent>({
      images:     allImages,
      categories: galleryCategories,
      videos:     videoHighlights,
    });
  }

  getImages():     Observable<GalleryImage[]>             { return of(allImages); }
  getCategories(): Observable<readonly GalleryCategory[]> { return of(galleryCategories); }
  getVideos():     Observable<VideoHighlight[]>           { return of(videoHighlights); }

  /** Convenience filter — returns images matching a single category, or all images on "All". */
  getImagesByCategory(category: GalleryCategory): Observable<GalleryImage[]> {
    return this.getImages().pipe(
      map((images) => (category === 'All' ? images : images.filter((i) => i.category === category))),
    );
  }
}
