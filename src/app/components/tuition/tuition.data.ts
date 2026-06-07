export interface TuitionCostRow {
  label: string;
  amount: string;
  highlight?: boolean;
  href?: string;
}

export interface TuitionScholarshipLink {
  label: string;
  href: string;
}

export const TUITION_COPY = {
  hero: {
    tag:      'Tuition',
    title:    'Tuition & Financial Assistance',
    subtitle: 'A faith-centered education made accessible through community support.',
  },
  intro: {
    paragraphs: [
      'At MUNA School of Pine Hill, it costs over $15,000 to educate a child in an Islamic environment with quality and excellence. Guided by Islamic values and the belief that seeking knowledge (\'ilm) is an act of worship, we are committed to nurturing both the academic and spiritual growth of every student. Through the generous support of our donors and dedicated stakeholders, we ensure that no family pays more than $6,000, making a faith-centered education accessible to our community.',
      'This investment provides a comprehensive educational experience, including high-quality instruction, daily breakfast and lunch, a personal computer, textbooks and learning materials, enhanced online learning programs, and robust career and college readiness training. Beyond academics, it supports the development of strong character (akhlaq), leadership, and a sense of responsibility grounded in Islamic principles.',
    ],
    scholarships: {
      lead: 'Families are also encouraged to apply for additional tuition assistance through external scholarship programs such as',
      programs: [
        {
          label: 'Children\'s Scholarship Fund Philadelphia',
          href:  'https://www.csfphiladelphia.org/apply/',
        },
        {
          label: 'Ellis Trust for Girls',
          href:  'https://ellistrust.org/eligibility/',
        },
      ] as TuitionScholarshipLink[],
      tail: 'which can further reduce the financial burden. Through these partnerships and the continued generosity of our supporters, MUNA School of Pine Hill remains committed to preparing students to excel academically, live their faith with integrity, and contribute positively to society.',
    },
    includes: [
      'High-quality instruction',
      'Daily breakfast and lunch',
      'Personal computer',
      'Textbooks and learning materials',
      'Enhanced online learning programs',
      'Career and college readiness training',
    ],
  },
  breakdown: {
    title:    'How Will It Work?',
    rows: [
      { label: 'Normal Tuition Cost', amount: '$15,000' },
      { label: 'School Provided Financial Assistance', amount: 'Up to $9,500' },
      { label: 'Children\'s Scholarship Fund Philadelphia', amount: 'Up to $3,250', href: 'https://www.csfphiladelphia.org/apply/' },
      { label: 'Final Tuition Cost After Deductions', amount: 'As low as $2,250', highlight: true },
    ] as TuitionCostRow[],
    multiChildNote: 'Multiple children enrolled? Get an extra $500 off for each additional child.',
  },
};
