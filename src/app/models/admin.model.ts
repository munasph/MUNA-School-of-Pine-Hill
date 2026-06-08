export type ApplicationStatus = 'PENDING' | 'REVIEWED' | 'ACCEPTED' | 'REJECTED';

export interface AdminAdmissionRecord {
  id:              number;
  applicationId:   string;
  fullName:        string;
  firstName?:      string;
  lastName?:       string;
  dob:             string;
  classApplying:   string;
  gender:          string;
  streetAddress?:  string;
  city?:           string;
  state?:          string;
  zip?:            string;
  parentName:      string;
  parentPhone:     string;
  parent1Email?:   string;
  parent2Name?:    string;
  parent2Phone?:   string;
  parent2Email?:   string;
  status:          ApplicationStatus;
  submittedAt:     string;
}

export interface AdminAdmissionDocument {
  id:            number;
  applicationId: number;
  docType:       string;
  fileName:      string;
  fileUrl:       string;
  uploadedAt:    string;
}

export interface AdminDashboardStats {
  totalApplications:   number;
  pendingApplications: number;
  activeAnnouncements: number;
  newContactMessages:  number;
}

export interface AdminAnnouncementRecord {
  id:         number;
  emoji?:     string;
  title:      string;
  subtitle?:  string;
  cta?:       string;
  href?:      string;
  active:     boolean;
  createdAt:  string;
  updatedAt:  string;
}

export interface AnnouncementPayload {
  emoji?:    string;
  title:     string;
  subtitle?: string;
  cta?:      string;
  href?:     string;
  active:    boolean;
}

export const APPLICATION_STATUSES: ApplicationStatus[] = [
  'PENDING', 'REVIEWED', 'ACCEPTED', 'REJECTED',
];

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  PENDING:  'Pending',
  REVIEWED: 'Reviewed',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
};

export type ContactInquiryStatus = 'NEW' | 'READ' | 'ARCHIVED';

export interface AdminContactInquiry {
  id:           number;
  messageId:    string;
  name:         string;
  email:        string;
  subject:      string;
  message:      string;
  status:       ContactInquiryStatus;
  submittedAt:  string;
}

export const CONTACT_INQUIRY_STATUSES: ContactInquiryStatus[] = [
  'NEW', 'READ', 'ARCHIVED',
];

export const CONTACT_STATUS_LABELS: Record<ContactInquiryStatus, string> = {
  NEW:      'New',
  READ:     'Read',
  ARCHIVED: 'Archived',
};
