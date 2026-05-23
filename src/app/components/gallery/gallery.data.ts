import type { GalleryImage } from '../../lib/types';

export const allImages: GalleryImage[] = [
  { id:  1, src: 'https://picsum.photos/seed/gal-campus-1/900/600',   label: 'Main Building',         category: 'Campus'    },
  { id:  2, src: 'https://picsum.photos/seed/gal-campus-2/600/600',   label: 'Library Hall',          category: 'Campus'    },
  { id:  3, src: 'https://picsum.photos/seed/gal-event-1/900/600',    label: 'Annual Prize Day',      category: 'Events'    },
  { id:  4, src: 'https://picsum.photos/seed/gal-sports-1/600/600',   label: 'Football Championship', category: 'Sports'    },
  { id:  5, src: 'https://picsum.photos/seed/gal-academic-1/900/600', label: 'Science Lab',           category: 'Academics' },
  { id:  6, src: 'https://picsum.photos/seed/gal-cultural-1/600/600', label: 'Cultural Programme',    category: 'Cultural'  },
  { id:  7, src: 'https://picsum.photos/seed/gal-sports-2/900/600',   label: 'Athletics Meet',        category: 'Sports'    },
  { id:  8, src: 'https://picsum.photos/seed/gal-campus-3/600/600',   label: 'Computer Lab',          category: 'Campus'    },
  { id:  9, src: 'https://picsum.photos/seed/gal-event-2/600/600',    label: 'Science Fair',          category: 'Events'    },
  { id: 10, src: 'https://picsum.photos/seed/gal-academic-2/900/600', label: 'Classroom Session',     category: 'Academics' },
  { id: 11, src: 'https://picsum.photos/seed/gal-cultural-2/600/600', label: 'Dance Performance',     category: 'Cultural'  },
  { id: 12, src: 'https://picsum.photos/seed/gal-campus-4/900/600',   label: 'School Grounds',        category: 'Campus'    },
];

export const galleryCategories = ['All', 'Campus', 'Events', 'Sports', 'Academics', 'Cultural'] as const;

export const videoHighlights = [
  { title: 'Campus Tour 2025',           seed: 'video-thumb-1' },
  { title: 'Annual Day Highlights 2025', seed: 'video-thumb-2' },
];

/** UI copy for the Gallery page template. */
export const GALLERY_COPY = {
  gallery: {
    hero:   { tag: 'Gallery', title: 'School Life', subtitle: 'Moments that define life at Your School Name.' },
    all:    'All',
    events: 'Events',
  },
};
