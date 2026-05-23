import { Globe, CheckCircle, Star } from 'lucide-angular';
import type { VisionItem } from '../lib/types';

/**
 * About-page hero block.
 * TODO ⟶ Replace photo, paragraphs and tag pills with your school's story.
 */
export const ABOUT_HERO = {
  sectionLabel: 'Our Story',
  headline:     'Shaping lives, building futures',
  photo:        'https://picsum.photos/seed/about-school/800/800',
  photoAlt:     'Photograph of your school\'s campus',
  paragraphs: [
    'A two-paragraph introduction works best here. Use the first paragraph to set the scene: where you are, who you serve, and what you stand for.',
    'Use the second paragraph to talk about accreditation, the range of programmes you offer, and the academic streams that lead students through to graduation.',
  ],
  tags: ['Accredited', 'Approved Curriculum', 'Established YYYY'],
};

/** Three cards under the hero on the About page. */
export const visionItems: VisionItem[] = [
  {
    title: 'Our Vision',
    icon:  Globe,
    desc:  'A one-sentence statement of the long-term future your school is working toward.',
  },
  {
    title: 'Our Mission',
    icon:  CheckCircle,
    desc:  'A one-sentence statement of how you serve students every day to reach that vision.',
  },
  {
    title: 'Our Values',
    icon:  Star,
    desc:  'A short list of the principles that guide your campus culture and pedagogy.',
  },
];
