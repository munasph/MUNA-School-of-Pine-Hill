export type LegalKind = 'privacy' | 'terms';

export interface LegalSection {
  heading: string;
  body:    string[];
}

export interface LegalDocument {
  kind:        LegalKind;
  title:       string;
  lastUpdated: string;
  sections:    LegalSection[];
}
