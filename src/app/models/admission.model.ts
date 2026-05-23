export interface ClassOption {
  value: string;
  label: string;
}

export interface AdmissionApplication {
  fullName:        string;
  dob:             string;
  classApplying:   string;
  gender:          'Male' | 'Female' | 'Other' | '';
  seeGpa?:         number | string;
  previousSchool?: string;
  parentName:      string;
  parentPhone:     string;
}

export interface AdmissionSuccessMessage {
  title:   string;
  message: string;
}

export interface AdmissionSubmitResponse {
  success:        boolean;
  applicationId?: string;
  message?:       string;
}
