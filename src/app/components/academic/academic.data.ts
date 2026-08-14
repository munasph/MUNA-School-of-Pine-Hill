export type AcademicSubjectTone = 'green' | 'orange';

export interface AcademicSubject {
  title: string;
  body:  string;
  tone:  AcademicSubjectTone;
}

export const ACADEMIC_COPY = {
  hero: {
    title: 'Academics',
  },
  intro: {
    paragraphs: [
      'The Academy implements the frameworks of the State of Pennsylvania Department of Education and the Common Core. These curriculum frameworks were developed recently by the most noted educators from the State of Pennsylvania in each of the seven basic subject areas. The frameworks are the first statewide guidelines for curriculum and instruction.',
      'They are based on sound research and effective practice. They reflect a vision of how classrooms of the future can and should look like to assist all students to achieve high standards of excellence. These frameworks, or outlines of the basic subject’s curricula, are highly competitive.',
    ],
  },
  coreSubjects: {
    banner: 'Core Subjects',
    items: [
      {
        title: 'Mathematics',
        tone:  'green',
        body:  'Mathematics is a key subject that allows students to discover and understand the patterns and logic that exist in our world. By learning fundamental principles and concepts, students acquire the tools to analyze and make sense of the structures found within mathematical systems.',
      },
      {
        title: 'Social Studies',
        tone:  'orange',
        body:  'Social Studies promotes inquiry and independent thinking, and empowers students to become socially responsible participants in a diverse and democratic society.',
      },
      {
        title: 'Science',
        tone:  'green',
        body:  'If students are to come to know and own the questions of science and technology, they need to engage with them the way scientists and technologists do.',
      },
      {
        title: 'Language Arts',
        tone:  'orange',
        body:  'Students are taught to be lifelong learners and they need the necessary skills to infer, analyze, and apply knowledge and experiences for a variety of purposes, audiences, and situations.',
      },
      {
        title: 'Islamic Studies',
        tone:  'green',
        body:  'Students develop an Islamic personality derived from the teachings of Quran and Seerah of Prophet Muhammad (PBUH).',
      },
      {
        title: 'Arabic Language',
        tone:  'orange',
        body:  'Learning more than one language opens doors to new ways of thinking and doing, believing and communicating, and through that process, students learn more about themselves. The World Language discipline is about communicating and making connections.',
      },
    ] as AcademicSubject[],
  },
  syllabus: {
    title: 'Syllabus',
    grades: [
      { name: 'Pre-K',        status: 'Uploaded Soon' },
      { name: 'Kindergarten', status: 'Uploaded Soon' },
    ],
  },
  books: {
    title:       'Arabic and Quran Books',
    description: 'Introducing our new Arabic and Quran books to our curriculum for an excellent method to learning at our Islamic school.',
    imageSrc:    'assets/images/al-hadiyah-al-azhariyah.png',
    imageAlt:    'Al-Hadiyah Al-Azhariyah — Arabic Alphabet book cover',
    linkLabel:   'View Book',
    linkHref:    'https://drive.google.com/file/d/1tLRA7G-A5MZYEWMNtcvStY7V6drDVvpM/view',
  },
  classSize: {
    banner: 'Class Size',
    before: 'The typical class size is ',
    highlight: '20',
    after: ' students. The small class size allows teachers to better attend the needs of each individual student.',
  },
};
