export interface CmsModuleInfo {
  key:            string;
  label:          string;
  description:    string;
  adminPath:      string;
  apiPath:        string;
  scaffoldOnly:   boolean;
}

export type CmsRecord = Record<string, unknown> & { id?: number };

export interface NotificationSettings {
  emailOnNewAdmission:   boolean;
  emailOnNewContact:     boolean;
  adminNotificationEmail?: string;
  updatedAt?:            string;
}

export interface AnalyticsSettings {
  enabled:           boolean;
  gaMeasurementId?:  string;
  updatedAt?:        string;
}

export interface AdminUserRecord {
  id:           number;
  email:        string;
  displayName?: string;
  role:         'ADMIN' | 'EDITOR';
  active:       boolean;
}

export interface AdmissionNoteRecord {
  id:             number;
  applicationId:  number;
  body:           string;
  authorEmail?:   string;
  createdAt:      string;
}

export interface AdmissionDocumentRecord {
  id:             number;
  applicationId:  number;
  docType?:       string;
  fileName:       string;
  fileUrl:        string;
  uploadedAt:     string;
}

export interface AuditLogRecord {
  id:          number;
  action:      string;
  entityType:  string;
  entityId?:   string;
  actorEmail?: string;
  details?:    string;
  createdAt:   string;
}
