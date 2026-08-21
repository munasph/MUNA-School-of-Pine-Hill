export type AdmissionDocumentGroup = 'required' | 'school';

export interface AdmissionDocumentField {
  type:     string;
  label:    string;
  hint?:    string;
  downloadHref?: string;
  downloadLabel?: string;
  required: boolean;
  group:    AdmissionDocumentGroup;
}

export const ADMISSION_DOCUMENT_GROUPS: { id: AdmissionDocumentGroup; title: string; note?: string }[] = [
  {
    id:    'required',
    title: 'Required Documents',
  },
  {
    id:    'school',
    title: 'School Records',
    note:  'Upload all records that apply to your child.',
  },
];

export const ADMISSION_DOCUMENT_FIELDS: AdmissionDocumentField[] = [
  { type: 'BIRTH_CERTIFICATE',     label: 'Birth Certificate',              required: true,  group: 'required' },
  { type: 'SOCIAL_SECURITY_CARD',  label: 'Social Security Card',           required: true,  group: 'required' },
  { type: 'PARENT_GUARDIAN_ID',    label: 'Parent / Guardian Photo ID',   required: true,  group: 'required' },
  { type: 'EMERGENCY_CONTACT_ID',  label: 'Emergency Contact Photo ID',     required: true,  group: 'required' },
  { type: 'PHYSICAL_EXAM',         label: 'Physical Exam Form',             required: true,  group: 'required', downloadHref: '/assets/forms/MUNA_Physical_Examination_Updated.pdf', downloadLabel: 'Download' },
  { type: 'DENTAL_EXAM',           label: 'Dental Exam Form',               required: true,  group: 'required', downloadHref: '/assets/forms/MUNA_Dental_Examination_Updated.pdf', downloadLabel: 'Download' },
  { type: 'IMMUNIZATION',          label: 'Immunization Record',            required: true,  group: 'required', hint: 'Required vaccines for attending school' },
  { type: 'REPORT_CARD',           label: 'Most Recent Report Card',        required: false, group: 'school' },
  { type: 'TRANSCRIPTS',           label: 'Transcripts',                    required: false, group: 'school' },
  { type: 'MAP_SCORES',            label: 'MAP Growth or STAR Scores',      required: false, group: 'school' },
  { type: 'PSSA_SCORES',           label: 'PSSA Scores',                    required: false, group: 'school' },
  { type: 'KEYSTONE_SCORES',       label: 'Keystone Scores',                required: false, group: 'school' },
  { type: 'IEP',                   label: 'IEP',                            required: false, group: 'school' },
];

export const ADMISSION_DOCUMENT_ACCEPT = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
export const ADMISSION_DOCUMENT_MAX_MB = 10;
