export const classOptions = [
  { value: 'pre-k', label: 'Pre-K (ages 3–4 by Sep 1)' },
  { value: 'kg',    label: 'Kindergarten (age 5 by Sep 1, 2026)' },
];

export const ADMISSION_SUCCESS = {
  title:   'Registration Received',
  message: 'Our team will contact you soon.',
};

export const ADMISSION_COPY = {
  admission: {
    hero: {
      tag:      'Registration',
      title:    'Registration',
      subtitle: 'Express interest in Pre-K or Kindergarten enrollment for the 2026/2027 school year. Spots are limited — first come, first served.',
    },
    highlights: {
      documentsTitle: 'To complete registration, you need the following:',
      documents: [
        { label: 'Parent/Guardian ID' },
        { label: 'Emergency Contact information and IDs' },
        {
          label: 'Physical Exam Form',
          downloadHref: '/assets/forms/MUNA_Physical_Examination_Updated.pdf',
          downloadLabel: 'Download',
        },
        {
          label: 'Dental Exam Form',
          downloadHref: '/assets/forms/MUNA_Dental_Examination_Updated.pdf',
          downloadLabel: 'Download',
        },
        { label: 'Immunization Record' },
        { label: 'Birth Certificate' },
      ],
    },
    links: {
      policyLabel:  'Admission Policy',
      tuitionLabel: 'Tuition & Fees',
      contactLabel: 'Questions? Email',
    },
  },
};
