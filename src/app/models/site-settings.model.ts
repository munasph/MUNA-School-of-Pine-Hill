export interface SiteSettings {
  name:            string;
  shortName:       string;
  foundedYear:     string;
  address:         string;
  phone:           string;
  email:           string;
  officeHours:     string;
  baseUrl:         string;
  admissionsOpen:              boolean;
  admissionDocumentsRequired:    boolean;
  admissionRequiredDocumentTypes: string[];
}

export type SiteSettingsPayload = SiteSettings;
