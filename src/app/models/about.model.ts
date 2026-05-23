import type { IconRef } from './shared.model';

export interface AboutHero {
  sectionLabel: string;
  headline:     string;
  photo:        string;
  photoAlt:     string;
  paragraphs:   string[];
  tags:         string[];
}

export interface VisionItem {
  title: string;
  icon:  IconRef;
  desc:  string;
}

export interface FacultyMember {
  name:      string;
  role:      string;
  expertise: string;
  photo:     string;
}

export interface TeachingFacultyPhoto {
  id:  number;
  src: string;
  alt: string;
}

/** Full About-page content bundle returned by `AboutService.getContent()`. */
export interface AboutContent {
  hero:             AboutHero;
  visionItems:      VisionItem[];
  keyFaculty:       FacultyMember[];
  teachingFaculty:  TeachingFacultyPhoto[];
}
