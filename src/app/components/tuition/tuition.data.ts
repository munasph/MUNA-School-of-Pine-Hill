export interface TuitionRateRow {
  grade:   string;
  tuition: string;
}

export interface SiblingExampleRow {
  child:    string;
  base:     string;
  discount: string;
  owed:     string;
  total?:   boolean;
}

export const TUITION_COPY = {
  hero: {
    tag:      'Tuition',
    title:    'Tuition',
    subtitle: 'Making Islamic education accessible without compromising quality.',
  },
  intro: {
    paragraphs: [
      'At MUNA School of Pine Hill (MSPH), we are committed to preserving the faith of the next generation and cultivating leaders who will help our community thrive for generations to come. With this mission in mind, we strive to provide an Islamic learning environment defined by exceptional quality and excellence.',
      'One of the greatest challenges in operating a full-time school is affordability. We recognize the need for Islamic education within our community, but that need cannot be met if costs remain out of reach for the families who need it most. Our goal is to make Islamic education as accessible as possible without compromising the quality of the experience we provide. To that end, we have worked diligently to keep tuition costs as low as possible while remaining operationally sustainable, and we are continuing to refine our payment process to make it simple and convenient for families.',
    ],
  },
  rates: {
    title: 'MSPH Tuition 2026/2027',
    table: [
      { grade: 'Pre-K',        tuition: '$5,000/child' },
      { grade: 'Kindergarten', tuition: '$5,000/child' },
    ] as TuitionRateRow[],
  },
  siblingDiscount: {
    title: 'Sibling Discount Policy',
    intro:
      'Families enrolling more than one student are eligible for a multi-child discount. Each additional child receives a 20% discount off the tuition amount paid by the child before them:',
    rules: [
      '1st child: full tuition',
      '2nd child: 20% off the 1st child’s tuition',
      '3rd child: 20% off the 2nd child’s (discounted) tuition',
      'And so on for each additional child',
    ],
    exampleTitle: 'Example: Family with 3 children enrolled',
    exampleRows: [
      { child: '1st child', base: '$5,000', discount: '—', owed: '$5,000' },
      { child: '2nd child', base: '$5,000', discount: '20% off 1st child’s amount', owed: '$4,000' },
      { child: '3rd child', base: '$5,000', discount: '20% off 2nd child’s amount', owed: '$3,200' },
      { child: 'Total',     base: '',       discount: '',  owed: '$12,200', total: true },
    ] as SiblingExampleRow[],
  },
  fees: {
    title: 'Mandatory Enrollment Fees',
    items: [
      '$100 Registration Fee/Student',
    ],
    paymentNote:
      'Fees and tuition must be paid by check or money order or cash. The check can be made to "MUNA School of Pine Hill".',
  },
  paymentPlan: {
    title: 'Payment Plan',
    paragraphs: [
      'For one student, there are a total of 9 payments/installments.',
      'First Installment: $560',
      'Subsequent Payment: $555/per month',
      'Payment is due the first of the month. If payment is not received by the 5th of the month, a late fee on any past due amount(s), will be assessed.',
    ],
    notes: [
      'Fees and tuition must be paid by check or money order or cash. The check can be made to "MUNA School of Pine Hill".',
      'Books/materials are free unless they are lost.',
      'Payment will have to be given directly to Office Staff',
    ],
  },
};
