import { Globe, CheckCircle, Star } from 'lucide-angular';
import type { VisionItem } from '../../models/about.model';

export const ABOUT_HERO = {
  sectionLabel: 'About',
  headline:     'About headline placeholder',
  photo:        'https://picsum.photos/seed/about-school/800/800',
  photoAlt:     'Placeholder campus image',
  paragraphs: [
    'First paragraph placeholder. Introduce your institution, community, and purpose.',
    'Second paragraph placeholder. Describe programmes, values, or history.',
  ],
  tags: ['Tag One', 'Tag Two', 'Tag Three'],
};

export const visionItems: VisionItem[] = [
  {
    title: 'Vision',
    icon:  Globe,
    desc:  'Vision statement placeholder.',
  },
  {
    title: 'Mission',
    icon:  CheckCircle,
    desc:  'Mission statement placeholder.',
  },
  {
    title: 'Values',
    icon:  Star,
    desc:  'Values statement placeholder.',
  },
];

export const ABOUT_COPY = {
  about: {
    hero:   { tag: 'About',          title: 'About Us',           subtitle: 'Short about section subtitle.' },
    vision: { tag: 'Vision & Mission', title: 'What We Stand For' },
    team:   { tag: 'Team',           title: 'Our Team' },
    faculty: { tag: 'Faculty', tagline: 'Faculty Section', title: 'Our Faculty' },
  },
};
