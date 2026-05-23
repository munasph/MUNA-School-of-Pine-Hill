import type { IconRef } from './shared.model';

export interface Hero {
  tagline:      string;
  headline1:    string;
  headline2:    string;
  description:  string;
  ctaPrimary:   string;
  ctaSecondary: string;
  preBadge:     string;
  excellence:   { label: string; desc: string };
  annotations:  string[];
}

export interface PrincipalMessage {
  title:      string;
  paragraphs: string[];
  quote:      string;
}

export interface Stat {
  label: string;
  value: string;
  icon:  IconRef;
  desc?: string;
}

export interface Feature {
  icon:  IconRef;
  title: string;
  desc:  string;
  stat?: string;
}

export interface NewsItem {
  title:   string;
  date:    string;
  excerpt: string;
}

export interface Testimonial {
  name:  string;
  role:  string;
  quote: string;
}

export interface CTASection {
  title:       string;
  description: string;
  button:      string;
}

/** Full home-page content bundle returned by `HomeService.getContent()`. */
export interface HomeContent {
  hero:             Hero;
  principalMessage: PrincipalMessage;
  stats:            Stat[];
  features:         Feature[];
  newsItems:        NewsItem[];
  testimonials:     Testimonial[];
  cta:              CTASection;
}
