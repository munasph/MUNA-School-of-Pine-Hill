/**
 * English translation bundle.
 *
 * TODO ⟶ Adjust strings to match your school's voice. The shape (`Translations`)
 *        is exported below and the matching Nepali / secondary-language bundle
 *        in `np.ts` must keep the same keys.
 */
export const en = {
  nav: {
    home:      'Home',
    about:     'About Us',
    academic:  'Academic',
    gallery:   'Gallery',
    contact:   'Contact',
    admission: 'Admission Open',
  },
  hero: {
    tagline:      'A short tagline',
    headline1:    'Empowering',
    headline2:    'Minds',
    subtext:      'Shaping the future through quality education at every level — kindergarten through senior secondary.',
    ctaPrimary:   'Explore Academic',
    ctaSecondary: 'Virtual Tour',
  },
  stats: {
    descriptions: [
      'Years serving the community',
      'Qualified teachers on staff',
      'Active students across grades',
      'Pass rate on the leaving examination',
    ],
  },
  leadership: {
    sectionTag:   'Leadership',
    sectionTitle: 'Guided by Vision',
    name:         'Principal\'s Name',
    role:         'Principal',
    quote:        'A short quote that captures your school\'s teaching philosophy.',
    cta:          'View Full Profile',
  },
  excellence: {
    sectionTag:   'Why Choose Us',
    sectionTitle: 'Academic Excellence',
    cards: [
      { title: 'Expert Faculty',     desc: 'Describe your faculty\'s qualifications and the mentorship students receive.' },
      { title: 'Modern Curriculum',  desc: 'Describe your curriculum, learning tools, and the skills students leave with.' },
      { title: 'Student Growth',     desc: 'Describe how co-curricular activities and pastoral care shape every student.' },
    ],
  },
  cta: {
    title:     'Ready to join the Your School Name family?',
    subtitle:  'Applications are open. Take the first step toward a brighter future.',
    primary:   'Apply Now',
    secondary: 'Learn More',
  },
  footer: {
    tagline:    'Quality education for character, knowledge, and wisdom.',
    quickLinks: 'Quick Links',
    programmes: 'Programmes',
    contact:    'Contact Us',
    rights:     'All rights reserved.',
    admission:  'Admission',
  },
  about: {
    hero:    { tag: 'About Us',         title: 'Our Story',          subtitle: 'Three decades of shaping young minds in our community.' },
    vision:  { tag: 'Vision & Mission', title: 'What Drives Us' },
    team:    { tag: 'Leadership Team',  title: 'Meet Our Faculty' },
    history: { tag: 'Our Journey',      title: 'Years of Excellence' },
  },
  academic: {
    hero:         { tag: 'Academic', title: 'Our Programmes',   subtitle: 'A complete path from kindergarten to graduation.' },
    programmes:   { tag: 'Streams',  title: 'Choose Your Path' },
    achievements: { tag: 'Results',  title: 'Our Track Record' },
  },
  gallery: {
    hero:   { tag: 'Gallery', title: 'School Life', subtitle: 'Moments that define life at Your School Name.' },
    photos: 'Photos',
    videos: 'Videos',
    events: 'Events',
    all:    'All',
  },
  contact: {
    hero: { tag: 'Contact', title: 'Get in Touch', subtitle: 'We\'d love to hear from you — reach out anytime.' },
    form: {
      title:   'Send a Message',
      name:    'Full Name',
      email:   'Email Address',
      phone:   'Phone Number',
      message: 'Your Message',
      submit:  'Send Message',
    },
    info: { address: 'Address', email: 'Email', phone: 'Phone', hours: 'Office Hours' },
  },
  admission: {
    hero:      { tag: 'Admissions', title: 'Join Your School Name', subtitle: 'Start your journey toward academic excellence.' },
    apply:     'Apply Now',
    learnMore: 'Learn More',
  },
};

export type Translations = typeof en;
