import type { IconRef } from './shared.model';

export interface Course {
  title:  string;
  levels: string;
  desc:   string;
  icon:   IconRef;
}

export interface HigherSecondaryStream {
  title: string;
  desc:  string;
  icon:  IconRef;
}

export interface Achievement {
  year:  string;
  title: string;
  desc:  string;
  icon:  IconRef;
}

/** Full Academic-page content bundle returned by `AcademicService.getContent()`. */
export interface AcademicContent {
  courses:         Course[];
  higherSecondary: HigherSecondaryStream[];
  achievements:    Achievement[];
}
