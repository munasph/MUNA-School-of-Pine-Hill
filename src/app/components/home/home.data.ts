import {
  GraduationCap, Users, CheckCircle, BookOpen, Globe, Trophy,
} from 'lucide-angular';
import type { Stat, Feature, Testimonial, NewsItem } from '../../models/home.model';
import type { GalleryImage } from '../../models/gallery.model';

export const HOME_COPY = {
  hero: {
    headline1:  'MUNA School',
    headline2:  'of Pine Hill',
    subtext:    'A faith-centered Islamic school in South Jersey. Pre-K & Kindergarten coming soon — limited spots available.',
    ctaPrimary: 'Register Now',
  },
  campaign: {
    enabled:    true, // kept for local fallback; live gate is Admin → Settings → campaignFlyerEnabled
    storageKey: 'msph-open-house-flyer-v2',
    badge:      'Coming Soon',
    title:      'Pre-K & Kindergarten',
    subtitle:   'Islamic School at MUNA School of Pine Hill. Limited spots — first come, first served.',
    openHouseDates: 'Open House: Aug 28–30 · 1:30 PM – 3:00 PM',
    ctaLabel:   'Secure Your Spot',
    ctaPath:    '/admission',
    pagePath:   '/announcements',
    flyerSrc:   '/assets/images/prek-kg-flyer-landscape.jpg',
    flyerAlt:   'MUNA School of Pine Hill Pre-K and Kindergarten open house flyer',
    dismissLabel: 'Maybe later',
  },
  quickLinks: {
    heading: 'Quick links',
    registration: {
      label: 'Registration',
      desc:  'Apply for enrollment',
      path:  '/admission',
    },
    faq: {
      label: 'FAQ',
      desc:  'Common questions',
      path:  '/faq',
    },
    handbook: {
      label: 'Student Handbook',
      desc:  'Coming soon',
      path:  '',
    },
    policy: {
      label: 'Admission Policy',
      desc:  'Requirements & process',
      path:  '/admission/policy',
    },
  },
  announcement: {
    heading: 'Announcements',
    empty:   'No announcements yet. Check back soon for updates.',
  },
};

/* Legacy exports kept for HomeService — hidden from the simplified homepage for now. */
export const HERO = {
  tagline: 'Tagline placeholder',
  headline1: 'Headline',
  headline2: 'Goes Here',
  description: 'A short description of your school and what you offer to students and families.',
  ctaPrimary: 'Primary Action',
  ctaSecondary: 'Secondary Action',
  preBadge: 'Optional badge text',
  excellence: { label: 'Highlight Label', desc: 'Short supporting detail.' },
  annotations: ['Tag One', 'Tag Two'],
};

export const PRINCIPAL_MESSAGE = {
  title: 'Leadership Message',
  paragraphs: ['Placeholder paragraph.'],
  quote: 'Placeholder quote.',
};

export const stats: Stat[] = [
  { label: 'Stat Label One', value: '00+', icon: BookOpen, desc: 'Short description' },
  { label: 'Stat Label Two', value: '00+', icon: GraduationCap, desc: 'Short description' },
  { label: 'Stat Label Three', value: '000+', icon: Users, desc: 'Short description' },
  { label: 'Stat Label Four', value: '00%', icon: CheckCircle, desc: 'Short description' },
];

export const features: Feature[] = [
  { icon: Trophy, title: 'Feature One', stat: '', desc: 'Description.' },
  { icon: GraduationCap, title: 'Feature Two', stat: '', desc: 'Description.' },
  { icon: Globe, title: 'Feature Three', stat: '', desc: 'Description.' },
];

export const newsItems: NewsItem[] = [];
export const testimonials: Testimonial[] = [];

export const CTA_SECTION = {
  title: 'Call to action headline',
  description: 'Supporting text.',
  button: 'Action Button',
};

export const homeGalleryImages: GalleryImage[] = [];
