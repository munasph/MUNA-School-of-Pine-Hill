/**
 * Site-wide branding and contact details.
 */
export const SCHOOL_INFO = {
  name:             'MUNA School of Pine Hill',
  shortName:        'MSPH',
  foundedYear:      '2026',
  foundedDate:      '2026',
  address:          '400 Erial Rd, Pine Hill, NJ 08021',
  phone:            '856-484-6949',
  phoneHref:        'tel:+18564846949',
  email:            'info@munasph.org',
  emailHref:        'mailto:info@munasph.org',
  officeHours:      'Office Hours Placeholder',
  copyrightYear:    new Date().getFullYear().toString(),
  mapQuery:         '400 Erial Rd, Pine Hill, NJ 08021',
  baseUrl:          'https://munasph.org',
};

export const SOCIAL_LINKS = [
  { name: 'Facebook',  href: 'https://example.com' },
  { name: 'YouTube',   href: 'https://example.com' },
  { name: 'Instagram', href: 'https://example.com' },
];

export const QUICK_LINKS = [
  { label: 'About',     path: '/about'            },
  { label: 'Academics', path: '/academic'         },
  { label: 'Admission', path: '/admission/policy' },
  { label: 'Tuition',   path: '/tuition'          },
  { label: 'Contact',   path: '/contact'          },
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
  { path: '/',                  label: 'Home' },
  { path: '/open-house',        label: 'Open House' },
  { path: '/about',             label: 'About' },
  { path: '/academic',          label: 'Academics' },
  { path: '/admission/policy',  label: 'Admission' },
  { path: '/tuition',           label: 'Tuition' },
  { path: '/contact',           label: 'Contact' },
] as const;

export const NAV_COPY = {
  nav: { admission: 'Registration' },
};

export const FOOTER_COPY = {
  footer: {
    tagline:    'Faith-centered K–12 education in South Jersey.',
    quickLinks: 'Quick Links',
    programmes: 'Programmes',
    contact:    'Contact',
    rights:     'All rights reserved.',
    admission:  'Admission',
  },
};
