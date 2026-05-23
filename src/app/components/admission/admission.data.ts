/**
 * Admission-page options + success copy.
 * TODO ⟶ Adjust class labels to match your school's grade structure.
 */
export const classOptions = [
  { value: 'nursery', label: 'Nursery' },
  { value: 'lkg',     label: 'LKG' },
  { value: 'ukg',     label: 'UKG' },
  ...Array.from({ length: 10 }, (_, i) => ({
    value: `class-${i + 1}`,
    label: `Class ${i + 1}`,
  })),
  { value: 'class-11-stream-one',   label: 'Class 11 (Stream One)' },
  { value: 'class-11-stream-two',   label: 'Class 11 (Stream Two)' },
  { value: 'class-11-stream-three', label: 'Class 11 (Stream Three)' },
];

export const ADMISSION_SUCCESS = {
  title:   'Application Received!',
  message: 'Thank you for applying. Our admissions team will review your application and contact you within 24 hours.',
};

/** UI copy for the Admission page template. */
export const ADMISSION_COPY = {
  admission: {
    hero: { tag: 'Admissions', title: 'Join Your School Name', subtitle: 'Start your journey toward academic excellence.' },
  },
};
