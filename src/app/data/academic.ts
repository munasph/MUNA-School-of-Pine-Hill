import {
  GraduationCap, BookOpen, Microscope, Briefcase, Plane,
  Trophy, Award, Star, Medal,
} from 'lucide-angular';
import type { Course, Achievement, HigherSecondaryStream } from '../lib/types';

/**
 * Academic-page card data.
 * TODO ⟶ Replace levels, descriptions, streams and achievement entries
 *        with the curriculum and milestones of your own institution.
 */

export const courses: Course[] = [
  { title: 'Kindergarten',    levels: 'Nursery – UKG', desc: 'Foundation years focusing on play, social skills, and basic literacy.',           icon: BookOpen },
  { title: 'Primary Level',   levels: 'Grade 1 – 5',   desc: 'Core curriculum across language, mathematics, science, and the social sciences.', icon: GraduationCap },
  { title: 'Secondary Level', levels: 'Grade 6 – 10',  desc: 'Advanced coursework preparing students for the secondary leaving examination.',   icon: Microscope },
];

export const higherSecondary: HigherSecondaryStream[] = [
  { title: 'Stream One – Sciences',         desc: 'Describe the science stream — subjects, target pathways, and laboratory work.',     icon: Microscope },
  { title: 'Stream Two – Business',         desc: 'Describe the business / management stream and the careers it leads toward.',         icon: Briefcase  },
  { title: 'Stream Three – Hospitality',    desc: 'Describe the hospitality / tourism stream and its practical components.',             icon: Plane      },
];

export const achievements: Achievement[] = [
  { year: 'YYYY', title: 'Achievement Title One',   desc: 'A one-sentence summary of the award and how your school earned it.', icon: Trophy },
  { year: 'YYYY', title: 'Achievement Title Two',   desc: 'A one-sentence summary of the milestone or recognition.',             icon: Award  },
  { year: 'YYYY', title: 'Achievement Title Three', desc: 'A one-sentence summary of the academic result or honour.',             icon: Star   },
  { year: 'YYYY', title: 'Achievement Title Four',  desc: 'A one-sentence summary of a sporting or extra-curricular triumph.',    icon: Medal  },
];
