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
  campaignFlyerEnabled:          boolean;
}

export type SiteSettingsPayload = SiteSettings;
