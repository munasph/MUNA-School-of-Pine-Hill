import { Globe, CheckCircle, Star } from 'lucide-angular';
import type { VisionItem } from '../../models/about.model';

export const ABOUT_HERO = {
  sectionLabel: 'About',
  headline:     'A faith-centered Islamic school in South Jersey',
  photo:        '/assets/images/webp/home-hero.webp',
  photoAlt:     'MUNA School of Pine Hill campus',
  paragraphs: [
    'MUNA School of Pine Hill is an initiative of Muslim Ummah of North America (MUNA), a national non-profit, social organization founded in New York in 1991. MUNA was established to serve the needs of the Muslim community across the United States and to share the message of Islam with a broader audience.',
    'MUNA School of Pine Hill was launched in 2026 by a dedicated group of community members with a shared vision: to establish a full-time K–12 Islamic school in South Jersey. As the Muslim community in the region has grown — reflected in the increasing number of masajid, halal restaurants and grocery stores, and community resources — so too has the need for a school that can provide children with a quality, faith-centered education close to home.',
  ],
  tags: ['Faith-Centered Education', 'Academic Excellence', 'Affordable for All'],
};

/** Combined Vision & Mission narrative for the About page. */
export const ABOUT_VISION_NARRATIVE =
  'At MUNA School of Pine Hill (MSPH), we are dedicated to building a community where Islamic values and academic excellence go hand in hand. Our mission is to shape students who don\u2019t just succeed in the classroom, but who live with integrity, lead with purpose, and inspire those around them. We are committed to providing every student with quality education, trusted mentorship, and guidance to become a lasting example for their community while at the same time making it affordable for all. By doing so, our ultimate goal is to preserve the beliefs and values of Islam in the generations to come in the United States of America.';

export const visionItems: VisionItem[] = [
  {
    title: 'Vision',
    icon:  Globe,
    desc:  'To preserve the beliefs and values of Islam in the generations to come in the United States of America.',
  },
  {
    title: 'Mission',
    icon:  CheckCircle,
    desc:  'To shape students who don\u2019t just succeed in the classroom, but who live with integrity, lead with purpose, and inspire those around them — providing every student with quality education, trusted mentorship, and guidance to become a lasting example for their community.',
  },
  {
    title: 'Values',
    icon:  Star,
    desc:  'Islamic values and academic excellence go hand in hand — a quality, faith-centered education that remains affordable for all.',
  },
];

export const ABOUT_COPY = {
  about: {
    hero:    { tag: 'About',             title: 'About Us' },
    vision:  { tag: 'Vision & Mission',  title: 'Vision and Mission' },
    history: { tag: 'History',           title: 'Our History' },
    team:    { tag: 'Team',              title: 'Our Team' },
    staff:   { tag: 'Staff',             title: 'Our Academic Programs & Teaching Structure' },
    faculty: { tag: 'Faculty', tagline: 'Faculty Section', title: 'Our Faculty' },
    contact: { tag: 'Contact',           title: 'Contact Us' },
  },
};
