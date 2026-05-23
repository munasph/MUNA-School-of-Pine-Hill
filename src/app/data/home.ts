import {
  GraduationCap, Users, CheckCircle,
  BookOpen, Globe, Trophy,
} from 'lucide-angular';
import type { StatItem, Feature, Testimonial, GalleryImage, NewsItem } from '../lib/types';

/**
 * Home-page content blocks.
 *
 * TODO ⟶ Replace headlines, copy, and stat values with your school's content.
 * The structure (hero badge → headline → subtext → CTA → trust badges →
 * stats → principal block → excellence cards → CTA collage) is preserved.
 */

export const HERO = {
  tagline:      'Tagline goes here',
  /** Headline rendered on two lines on desktop. */
  headline1:    'Empowering',
  headline2:    'Minds',
  description:  'A premier institution dedicated to nurturing well-rounded students through quality education.',
  ctaPrimary:   'Admission Open',
  ctaSecondary: 'Learn More',
  preBadge:     'Pre-registration for the next academic year is now open. →',
  excellence: {
    label: 'Excellence Proven',
    desc:  'Outstanding academic results recognised across the region.',
  },
  annotations: ['Affiliated', 'Grade K–12'],
};

/** Two-paragraph block shown beside the principal's photo on the home page. */
export const PRINCIPAL_MESSAGE = {
  title: 'Message from the Principal',
  paragraphs: [
    'Welcome to Your School Name. Replace this paragraph with a short introduction from your principal — its purpose is to set the tone for the rest of the site and connect with prospective families.',
    'Use a second paragraph to highlight what makes your institution distinct — your accreditation, your locale, the values that guide your campus, and the kind of citizen your students grow into.',
  ],
  quote: 'A short, memorable quote that captures your school\'s philosophy.',
  signedBy: 'The Principal',
};

export const stats: StatItem[] = [
  { label: 'Years of Excellence', value: '00+',    icon: BookOpen,      desc: 'Established placeholder year' },
  { label: 'Qualified Teachers',  value: '00+',    icon: GraduationCap, desc: 'Expert faculty' },
  { label: 'Students Enrolled',   value: '0,000+', icon: Users,         desc: 'Active learners' },
  { label: 'Pass Rate',           value: '00%',    icon: CheckCircle,   desc: 'Board exam results' },
];

export const features: Feature[] = [
  {
    icon:  Trophy,
    title: 'Academic Excellence',
    stat:  'Top results',
    desc:  'A short, focused description of your academic strengths and the outcomes your students achieve.',
  },
  {
    icon:  GraduationCap,
    title: 'Dedicated Faculty',
    stat:  'Expert teachers',
    desc:  'Describe your faculty\'s qualifications and the personalised mentorship students receive.',
  },
  {
    icon:  Globe,
    title: 'Future-Ready Campus',
    stat:  'Modern facilities',
    desc:  'Describe your campus facilities — labs, library, technology, and the skills you build in students.',
  },
];

export const AI_TUTOR = {
  title:       'Optional Feature Block',
  description: 'Use this slot for a flagship feature, programme, or technology that sets you apart.',
  feature:     'Highlight subtext',
};

export const newsItems: NewsItem[] = [
  { title: 'Headline one',   date: 'Month DD, YYYY', excerpt: 'Short summary of a recent achievement or update.' },
  { title: 'Headline two',   date: 'Month DD, YYYY', excerpt: 'Short summary of a recent achievement or update.' },
  { title: 'Headline three', date: 'Month DD, YYYY', excerpt: 'Short summary of a recent achievement or update.' },
];

export const testimonials: Testimonial[] = [
  { name: 'Student / Alum Name', role: 'Alumni, Class of YYYY', quote: 'A brief, sincere quote from a graduate.' },
  { name: 'Parent Name',         role: 'Parent',                quote: 'A brief, sincere quote from a parent.' },
  { name: 'Current Student',     role: 'Current Student',       quote: 'A brief, sincere quote from a current student.' },
];

export const CTA_SECTION = {
  title:       'Ready to join the Your School Name family?',
  description: 'Applications are open. Take the first step toward a brighter future.',
  button:      'Apply Now',
};

export const homeGalleryImages: GalleryImage[] = [
  { id: 1, src: '/assets/images/hero.jpg',                          label: 'Main Campus',  span: 'col-span-2 row-span-2' },
  { id: 2, src: 'https://picsum.photos/seed/library/600/600',       label: 'Library' },
  { id: 3, src: 'https://picsum.photos/seed/scilab/600/600',        label: 'Science Lab' },
  { id: 4, src: 'https://picsum.photos/seed/sports/600/600',        label: 'Sports Ground' },
  { id: 5, src: 'https://picsum.photos/seed/classroom/600/600',     label: 'Classrooms' },
  { id: 6, src: 'https://picsum.photos/seed/annualday/1200/600',    label: 'Annual Day', span: 'col-span-2' },
];
