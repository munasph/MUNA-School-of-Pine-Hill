import {
  GraduationCap, BookOpen, Microscope, Briefcase, Plane,
  Trophy, Award, Star, Medal,
} from 'lucide-angular';
import type { Course, Achievement, HigherSecondaryStream } from '../../models/academic.model';

export const courses: Course[] = [
  { title: 'Programme One', levels: 'Level placeholder', desc: 'Programme description placeholder.', icon: BookOpen },
  { title: 'Programme Two', levels: 'Level placeholder', desc: 'Programme description placeholder.', icon: GraduationCap },
  { title: 'Programme Three', levels: 'Level placeholder', desc: 'Programme description placeholder.', icon: Microscope },
];

export const higherSecondary: HigherSecondaryStream[] = [
  { title: 'Stream One',   desc: 'Stream description placeholder.', icon: Microscope },
  { title: 'Stream Two',   desc: 'Stream description placeholder.', icon: Briefcase  },
  { title: 'Stream Three', desc: 'Stream description placeholder.', icon: Plane      },
];

export const achievements: Achievement[] = [
  { year: 'YYYY', title: 'Achievement title one',   desc: 'Achievement description placeholder.', icon: Trophy },
  { year: 'YYYY', title: 'Achievement title two',   desc: 'Achievement description placeholder.', icon: Award  },
  { year: 'YYYY', title: 'Achievement title three', desc: 'Achievement description placeholder.', icon: Star   },
  { year: 'YYYY', title: 'Achievement title four',  desc: 'Achievement description placeholder.', icon: Medal  },
];

export const ACADEMIC_COPY = {
  academic: {
    hero: {
      tag:      'Academic',
      title:    'Academic Programmes',
      subtitle: 'Academic section subtitle placeholder.',
      chips:    ['Chip One', 'Chip Two', 'Chip Three'],
    },
    programmes: {
      tag:      'Programmes',
      title:    'Our Programmes',
      subtitle: 'Programmes section subtitle placeholder.',
    },
    streams: {
      intro: 'Streams section intro placeholder.',
    },
    achievements: { tag: 'Achievements', title: 'Highlights' },
  },
};
