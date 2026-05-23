/**
 * Site-wide branding constants.
 *
 * TODO ⟶ Replace every value below with your own school's information.
 * These placeholders are used across the Navbar, Footer, SEO meta, JSON-LD,
 * Contact page, Privacy / Terms pages.
 */
export const SCHOOL_INFO = {
  name:             'Your School Name',
  shortName:        'Your School',
  foundedYear:      '2000',
  foundedDate:      '1st January 2000',
  address:          '123 Main Street, Your City, Your Region, Country',
  phone:            '+1 555-0100',
  phoneHref:        'tel:+15550100',
  email:            'info@yourschool.example',
  emailHref:        'mailto:info@yourschool.example',
  officeHours:      'Mon – Fri: 9:00 AM – 5:00 PM',
  copyrightYear:    new Date().getFullYear().toString(),
  /** Used to build the embedded Google Maps iframe on the Contact page. */
  mapQuery:         'Your School Name, Your City',
  /** Used for canonical / OG URLs in the SEO service. */
  baseUrl:          'https://yourschool.example',
};

export const SOCIAL_LINKS = [
  { name: 'Facebook',  href: 'https://facebook.com/yourschool' },
  { name: 'YouTube',   href: 'https://youtube.com/@yourschool' },
  { name: 'Instagram', href: 'https://instagram.com/yourschool' },
];

export const QUICK_LINKS = [
  { label: 'About Us',          path: '/about'     },
  { label: 'Academic Programs', path: '/academic'  },
  { label: 'Gallery',           path: '/gallery'   },
  { label: 'Admission',         path: '/admission' },
  { label: 'Contact Us',        path: '/contact'   },
];

export const PROGRAMS_LIST = [
  'Kindergarten',
  'Primary (1–5)',
  'Secondary (6–10)',
  'Stream One (11–12)',
  'Stream Two (11–12)',
  'Stream Three (11–12)',
];

export const ANNOUNCEMENT = {
  emoji:    '🎓',
  title:    'Pre-Registration Open',
  subtitle: 'Next Academic Year',
  cta:      'Apply Now',
  href:     '/admission',
};

/** Nav link labels used by the Navbar. */
export const NAV_LINKS = [
  { path: '/',         label: 'Home' },
  { path: '/about',    label: 'About Us' },
  { path: '/academic',  label: 'Academic' },
  { path: '/gallery',  label: 'Gallery' },
  { path: '/contact',  label: 'Contact' },
] as const;

export const NAV_COPY = {
  nav: { admission: 'Admission Open' },
};

/** UI copy for the Footer template. */
export const FOOTER_COPY = {
  footer: {
    tagline:    'Quality education for character, knowledge, and wisdom.',
    quickLinks: 'Quick Links',
    programmes: 'Programmes',
    contact:    'Contact Us',
    rights:     'All rights reserved.',
    admission:  'Admission',
  },
};
