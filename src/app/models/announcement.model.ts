export interface Announcement {
  id:         number;
  emoji?:     string;
  title:      string;
  subtitle?:  string;
  body?:      string;
  cta?:       string;
  href?:      string;
  active:     boolean;
  createdAt:  string;
  updatedAt:  string;
}
