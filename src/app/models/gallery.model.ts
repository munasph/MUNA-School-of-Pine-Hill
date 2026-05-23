export interface GalleryImage {
  id:        number;
  src:       string;
  label:     string;
  category?: string;
  span?:     string;
}

export type GalleryCategory =
  | 'All'
  | 'Campus'
  | 'Events'
  | 'Sports'
  | 'Academics'
  | 'Cultural';

export interface VideoHighlight {
  title: string;
  seed:  string;
}

/** Full Gallery-page content bundle returned by `GalleryService.getContent()`. */
export interface GalleryContent {
  images:     GalleryImage[];
  categories: readonly GalleryCategory[];
  videos:    VideoHighlight[];
}
