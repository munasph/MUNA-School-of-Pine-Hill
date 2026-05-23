/**
 * Site-wide branding placeholders.
 * Replace these values when you are ready to publish real school details.
 */
export const SCHOOL_INFO = {
  name:             'School Name',
  shortName:        'School',
  foundedYear:      '0000',
  foundedDate:      'Month DD, YYYY',
  address:          'Street Address, City, State, Country',
  phone:            'Phone Number',
  phoneHref:        'tel:+10000000000',
  email:            'email@example.com',
  emailHref:        'mailto:email@example.com',
  officeHours:      'Office Hours Placeholder',
  copyrightYear:    new Date().getFullYear().toString(),
  mapQuery:         'School Name, City',
  baseUrl:          'https://example.com',
};

export const SOCIAL_LINKS = [
  { name: 'Facebook',  href: 'https://example.com' },
  { name: 'YouTube',   href: 'https://example.com' },
  { name: 'Instagram', href: 'https://example.com' },
];

export const QUICK_LINKS = [
  { label: 'About',     path: '/about'     },
  { label: 'Academic',  path: '/academic'  },
  { label: 'Gallery',   path: '/gallery'   },
  { label: 'Admission', path: '/admission' },
  { label: 'Contact',   path: '/contact'   },
];

export const PROGRAMS_LIST = [
  'Programme One',
  'Programme Two',
  'Programme Three',
  'Programme Four',
];

export const ANNOUNCEMENT = {
  emoji:    '🎓',
  title:    'Announcement Title',
  subtitle: 'Short subtitle',
  cta:      'Learn More',
  href:     '/admission',
};

export const NAV_LINKS = [
  { path: '/',         label: 'Home' },
  { path: '/about',    label: 'About' },
  { path: '/academic', label: 'Academic' },
  { path: '/gallery',  label: 'Gallery' },
  { path: '/contact',  label: 'Contact' },
] as const;

export const NAV_COPY = {
  nav: { admission: 'Admission' },
};

export const FOOTER_COPY = {
  footer: {
    tagline:    'A short tagline about your school can go here.',
    quickLinks: 'Quick Links',
    programmes: 'Programmes',
    contact:    'Contact',
    rights:     'All rights reserved.',
    admission:  'Admission',
  },
};
