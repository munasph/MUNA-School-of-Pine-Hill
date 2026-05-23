import {
  GraduationCap, Users, CheckCircle,
  BookOpen, Globe, Trophy,
} from 'lucide-angular';
import type { Stat, Feature, Testimonial, NewsItem } from '../../models/home.model';
import type { GalleryImage } from '../../models/gallery.model';

export const HERO = {
  tagline:      'Tagline placeholder',
  headline1:    'Headline',
  headline2:    'Goes Here',
  description:  'A short description of your school and what you offer to students and families.',
  ctaPrimary:   'Primary Action',
  ctaSecondary: 'Secondary Action',
  preBadge:     'Optional badge text',
  excellence: {
    label: 'Highlight Label',
    desc:  'Short supporting detail.',
  },
  annotations: ['Tag One', 'Tag Two'],
};

export const PRINCIPAL_MESSAGE = {
  title: 'Leadership Message',
  paragraphs: [
    'This section is reserved for a welcome message from school leadership. Add your introduction here when ready.',
    'Use a second paragraph to describe your mission, values, and what makes your institution unique.',
  ],
  quote: 'An inspirational quote about education can be placed here.',
};

export const stats: Stat[] = [
  { label: 'Stat Label One',   value: '00+', icon: BookOpen,      desc: 'Short description' },
  { label: 'Stat Label Two',   value: '00+', icon: GraduationCap, desc: 'Short description' },
  { label: 'Stat Label Three', value: '000+', icon: Users,        desc: 'Short description' },
  { label: 'Stat Label Four',  value: '00%', icon: CheckCircle,   desc: 'Short description' },
];

export const features: Feature[] = [
  {
    icon:  Trophy,
    title: 'Feature Title One',
    stat:  'Optional stat',
    desc:  'Brief description of this feature or benefit.',
  },
  {
    icon:  GraduationCap,
    title: 'Feature Title Two',
    stat:  'Optional stat',
    desc:  'Brief description of this feature or benefit.',
  },
  {
    icon:  Globe,
    title: 'Feature Title Three',
    stat:  'Optional stat',
    desc:  'Brief description of this feature or benefit.',
  },
];

export const AI_TUTOR = {
  title:       'Optional Section Title',
  description: 'Use this area for a highlighted programme, feature, or call-out.',
  feature:     'Supporting detail',
};

export const newsItems: NewsItem[] = [
  { title: 'News headline one',   date: 'Month DD, YYYY', excerpt: 'Short news summary.' },
  { title: 'News headline two',   date: 'Month DD, YYYY', excerpt: 'Short news summary.' },
  { title: 'News headline three', date: 'Month DD, YYYY', excerpt: 'Short news summary.' },
];

export const testimonials: Testimonial[] = [
  { name: 'Name placeholder', role: 'Role placeholder', quote: 'Testimonial quote placeholder.' },
  { name: 'Name placeholder', role: 'Role placeholder', quote: 'Testimonial quote placeholder.' },
  { name: 'Name placeholder', role: 'Role placeholder', quote: 'Testimonial quote placeholder.' },
];

export const CTA_SECTION = {
  title:       'Call to action headline',
  description: 'Supporting text encouraging visitors to take the next step.',
  button:      'Action Button',
};

export const homeGalleryImages: GalleryImage[] = [
  { id: 1, src: '/assets/images/hero.jpg',                    label: 'Image one',  span: 'col-span-2 row-span-2' },
  { id: 2, src: 'https://picsum.photos/seed/gallery-1/600/600', label: 'Image two' },
  { id: 3, src: 'https://picsum.photos/seed/gallery-2/600/600', label: 'Image three' },
  { id: 4, src: 'https://picsum.photos/seed/gallery-3/600/600', label: 'Image four' },
  { id: 5, src: 'https://picsum.photos/seed/gallery-4/600/600', label: 'Image five' },
  { id: 6, src: 'https://picsum.photos/seed/gallery-5/1200/600', label: 'Image six', span: 'col-span-2' },
];

export const HOME_COPY = {
  hero: {
    headline1:  'Headline',
    headline2:  'Goes Here',
    subtext:    'A short description of your school and what you offer to students and families.',
    ctaPrimary: 'Primary Action',
    trust1Title: 'Trust badge one',
    trust1Desc:  'Supporting detail',
    trust2Title: 'Trust badge two',
    trust2Desc:  'Supporting detail',
  },
  leadership: {
    sectionTag:   'Leadership',
    sectionTitle: 'Leadership Message',
    quote:        'An inspirational quote about education can be placed here.',
  },
  excellence: {
    sectionTag:   'Section Tag',
    sectionTitle: 'Section Title',
    subtitle:     'Section subtitle placeholder.',
    cards: [
      { title: 'Card Title One',   desc: 'Card description placeholder.' },
      { title: 'Card Title Two',   desc: 'Card description placeholder.' },
      { title: 'Card Title Three', desc: 'Card description placeholder.' },
    ],
  },
  cta: {
    pill:      'Call to action',
    title:     'Call to action headline',
    subtitle:  'Supporting text encouraging visitors to take the next step.',
    primary:   'Primary Button',
    secondary: 'Secondary Button',
  },
};
