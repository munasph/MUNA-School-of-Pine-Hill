export type PortalRole = 'PARENT' | 'STUDENT';

export interface PortalLoginCredentials {
  email:    string;
  password: string;
}

export interface PortalSignupPayload {
  fullName:        string;
  email:           string;
  password:        string;
  confirmPassword: string;
  role:            PortalRole;
}

export interface PortalSession {
  token:     string;
  email:     string;
  fullName:  string;
  role:      PortalRole;
  /** Placeholder until linked to real student records */
  studentName?: string;
}
