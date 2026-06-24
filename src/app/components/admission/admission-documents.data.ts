export type AdmissionDocumentGroup = 'required' | 'school';

export interface AdmissionDocumentField {
  type:     string;
  label:    string;
  hint?:    string;
  required: boolean;
  group:    AdmissionDocumentGroup;
}

export const ADMISSION_DOCUMENT_GROUPS: { id: AdmissionDocumentGroup; title: string; note?: string }[] = [
  {
    id:    'required',
    title: 'Supporting Documents (optional)',
    note:  'You may upload documents now or wait until our Admissions Team contacts you.',
  },
  {
    id:    'school',
    title: 'School Records (optional)',
    note:  'Upload any records that apply to your child.',
  },
];

export const ADMISSION_DOCUMENT_FIELDS: AdmissionDocumentField[] = [
  { type: 'BIRTH_CERTIFICATE',     label: 'Birth Certificate',              required: false, group: 'required' },
  { type: 'SOCIAL_SECURITY_CARD',  label: 'Social Security Card',           required: false, group: 'required' },
  { type: 'PARENT_GUARDIAN_ID',    label: 'Parent / Guardian Photo ID',   required: false, group: 'required' },
  { type: 'EMERGENCY_CONTACT_ID',  label: 'Emergency Contact Photo ID',     required: false, group: 'required' },
  { type: 'PHYSICAL_EXAM',         label: 'Physical Exam Form',             required: false, group: 'required', hint: 'PHYSICAL EXAM FORM.docx' },
  { type: 'DENTAL_EXAM',           label: 'Dental Exam Form',               required: false, group: 'required', hint: 'DENTAL FORM.docx' },
  { type: 'IMMUNIZATION',          label: 'Immunization Record',            required: false, group: 'required', hint: 'Required vaccines for attending school' },
  { type: 'TAX_1040',              label: 'Form 1040 of Tax Return',        required: false, group: 'required', hint: 'Form 1040 of Tax Return.pdf' },
  { type: 'REPORT_CARD',           label: 'Most Recent Report Card',        required: false, group: 'school' },
  { type: 'TRANSCRIPTS',           label: 'Transcripts',                    required: false, group: 'school' },
  { type: 'MAP_SCORES',            label: 'MAP Growth or STAR Scores',      required: false, group: 'school' },
  { type: 'PSSA_SCORES',           label: 'PSSA Scores',                    required: false, group: 'school' },
  { type: 'KEYSTONE_SCORES',       label: 'Keystone Scores',                required: false, group: 'school' },
  { type: 'IEP',                   label: 'IEP',                            required: false, group: 'school' },
];

export const ADMISSION_DOCUMENT_ACCEPT = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
export const ADMISSION_DOCUMENT_MAX_MB = 10;
