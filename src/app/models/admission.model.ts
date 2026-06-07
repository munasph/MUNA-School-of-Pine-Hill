export interface ClassOption {
  value: string;
  label: string;
}

export interface AdmissionApplication {
  firstName:       string;
  lastName:        string;
  gender:          'Male' | 'Female' | '';
  dob:             string;
  streetAddress:   string;
  city:            string;
  state:           string;
  zip:             string;
  classApplying:   string;
  parent1Name:     string;
  parent1Phone:    string;
  parent1Email:    string;
  parent2Name?:    string;
  parent2Phone?:   string;
  parent2Email?:   string;
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

export interface AdmissionDocumentUpload {
  docType: string;
  file:    File;
}
