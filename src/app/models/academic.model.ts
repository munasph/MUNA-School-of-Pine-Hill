export type AcademicSubjectTone = 'green' | 'orange';

export interface AcademicSubject {
  title: string;
  body:  string;
  tone:  AcademicSubjectTone;
}

export interface AcademicGradeStatus {
  name:   string;
  status: string;
}

export interface AcademicPageContent {
  hero: {
    title: string;
  };
  intro: {
    paragraphs: string[];
  };
  coreSubjects: {
    banner: string;
    items: AcademicSubject[];
  };
  syllabus: {
    title:  string;
    grades: AcademicGradeStatus[];
  };
  books: {
    title:       string;
    description: string;
    imageSrc:    string;
    imageAlt:    string;
    linkLabel:   string;
    linkHref:    string;
  };
  classSize: {
    banner:    string;
    before:    string;
    highlight: string;
    after:     string;
  };
}
