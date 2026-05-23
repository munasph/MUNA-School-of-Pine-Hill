import type { LucideIconData } from 'lucide-angular';

export type IconRef = LucideIconData;

export interface GalleryImage {
  id: number;
  src: string;
  label: string;
  category?: string;
  span?: string;
}

export interface StatItem {
  label: string;
  value: string;
  icon: IconRef;
  desc?: string;
}

export interface Feature {
  icon: IconRef;
  title: string;
  desc: string;
  stat?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

export interface NewsItem {
  title: string;
  date: string;
  excerpt: string;
}

export interface FacultyMember {
  name: string;
  role: string;
  expertise: string;
  photo: string;
}

export interface Achievement {
  year: string;
  title: string;
  desc: string;
  icon: IconRef;
}

export interface Course {
  title: string;
  levels: string;
  desc: string;
  icon: IconRef;
}

export interface HigherSecondaryStream {
  title: string;
  desc: string;
  icon: IconRef;
}

export interface VisionItem {
  title: string;
  icon: IconRef;
  desc: string;
}
