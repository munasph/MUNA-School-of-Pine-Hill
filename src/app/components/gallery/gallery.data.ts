import type { GalleryImage, GalleryCategory } from '../../models/gallery.model';

export const allImages: GalleryImage[] = [
  { id:  1, src: 'https://picsum.photos/seed/gal-1/900/600',  label: 'Photo label one',   category: 'Campus'    },
  { id:  2, src: 'https://picsum.photos/seed/gal-2/600/600',  label: 'Photo label two',   category: 'Campus'    },
  { id:  3, src: 'https://picsum.photos/seed/gal-3/900/600',  label: 'Photo label three', category: 'Events'    },
  { id:  4, src: 'https://picsum.photos/seed/gal-4/600/600',  label: 'Photo label four',  category: 'Events'    },
  { id:  5, src: 'https://picsum.photos/seed/gal-5/900/600',  label: 'Photo label five',  category: 'Sports'    },
  { id:  6, src: 'https://picsum.photos/seed/gal-6/600/600',  label: 'Photo label six',   category: 'Sports'    },
  { id:  7, src: 'https://picsum.photos/seed/gal-7/900/600',  label: 'Photo label seven', category: 'Academics' },
  { id:  8, src: 'https://picsum.photos/seed/gal-8/600/600',  label: 'Photo label eight', category: 'Cultural'  },
];

export const galleryCategories: readonly GalleryCategory[] = [
  'All', 'Campus', 'Events', 'Sports', 'Academics', 'Cultural',
];

export const videoHighlights = [
  { title: 'Video title one', seed: 'video-thumb-1' },
  { title: 'Video title two', seed: 'video-thumb-2' },
];

export const GALLERY_COPY = {
  gallery: {
    hero:   { tag: 'Gallery', title: 'Gallery', subtitle: 'Gallery section subtitle placeholder.' },
    all:    'All',
    events: 'Events',
  },
};
