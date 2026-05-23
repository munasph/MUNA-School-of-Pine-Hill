export interface ContactMessage {
  name:    string;
  email:   string;
  subject: string;
  message: string;
}

export interface ContactInfo {
  address:     string;
  phone:       string;
  phoneHref:   string;
  email:       string;
  emailHref:   string;
  officeHours: string;
  mapQuery:    string;
}

export interface ContactSubmitResponse {
  success:    boolean;
  messageId?: string;
  message?:   string;
}
