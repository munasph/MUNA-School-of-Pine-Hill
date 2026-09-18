export interface StaffCurriculumSection {
  title: string;
  items: string[];
}

export interface StaffTeacher {
  name: string;
  role: string;
  greeting?: string;
  intro: string;
  highlight?: string;
  credentials?: string[];
  curriculumTitle: string;
  curriculum: StaffCurriculumSection[];
  goals?: string[];
  parentNote?: string;
  closing?: string;
  flyerSrc: string;
  flyerAlt: string;
}

export const STAFF_COPY = {
  hero: {
    tag: 'Staff',
    title: 'Our Teachers',
    subtitle:
      'Meet the Pre-K and Kindergarten educators guiding students in faith, language, and early learning at MUNA School of Pine Hill.',
  },
  teachers: [
    {
      name: 'Ms. Ayat',
      role: 'Pre-K & Kindergarten Arabic, Qur’an, and Islamic Studies',
      greeting: 'Assalamu Alaikum & Welcome!',
      intro:
        'I am so excited to be your child’s Arabic, Qur’an, and Islamic Studies teacher this year! My goal is to create a warm, engaging, and nurturing classroom where our little learners grow in their love for Allah, the Qur’an, the Arabic language, and Islamic values.',
      highlight: 'More than 5 years of experience teaching young children in Arabic, Qur’an, and Islamic Studies.',
      curriculumTitle: 'What We’ll Learn',
      curriculum: [
        {
          title: 'Qur’an',
          items: [
            'Short surahs and daily review',
            'Proper pronunciation and beginning tajwid',
            'Simple meanings and lessons from the surahs',
            'Daily duas',
          ],
        },
        {
          title: 'Arabic',
          items: [
            'Recognizing and writing Arabic letters',
            'Letter sounds',
            'Beginning vocabulary',
            'Colors, numbers, family, animals, and everyday words',
            'Fun songs, games, crafts, and activities',
          ],
        },
        {
          title: 'Islamic Studies',
          items: [
            'The Five Pillars of Islam',
            'Islamic manners and good character',
            'Stories of the Prophets',
            'Important duas and daily Islamic practices',
            'Islamic holidays and special occasions',
            'Learning to love Allah and follow the example of Prophet Muhammad ﷺ',
          ],
        },
      ],
      goals: [
        'Love Allah and the Qur’an',
        'Build confidence in Arabic',
        'Develop beautiful Islamic manners',
        'Enjoy learning through play and exploration',
        'Feel happy, safe, and excited to come to class',
      ],
      parentNote:
        'Parents are our partners! Your support at home makes a big difference. Even 5–10 minutes of review can help your child build confidence and remember what we learn in class.',
      closing:
        'I look forward to working together and having a wonderful school year filled with learning, growth, and beautiful memories, insha’Allah!',
      flyerSrc: '/assets/images/staff/ms-ayat-meet-teacher.jpg',
      flyerAlt: 'Meet your teacher flyer for Ms. Ayat, Pre-K and Kindergarten Arabic, Qur’an, and Islamic Studies',
    },
    {
      name: 'Ms. Fatima Jazzar',
      role: 'Kindergarten Teacher',
      intro:
        'Ms. Fatima Jazzar is an experienced educator with a background in Early Childhood Education and an educational credential issued by the New Jersey Department of Education. She is CPR certified and brings valuable classroom experience across early childhood, elementary, and secondary school settings. She is committed to creating a nurturing, engaging, and faith-centered classroom where every child can build confidence, develop strong foundational skills, and grow academically, socially, and spiritually.',
      credentials: [
        'Early Childhood Education',
        'NJDOE Educational Credential',
        'CPR Certified',
      ],
      curriculumTitle: 'What We Will Learn',
      curriculum: [
        {
          title: 'Faith & Language',
          items: [
            'Islamic Studies & Character: faith, manners, values, and daily practice',
            'Qur’an: recitation, memorization, and foundational skills',
            'Arabic Language: listening, speaking, letters, and vocabulary',
            'English Language Arts: phonics, reading, writing, vocabulary, and comprehension',
          ],
        },
        {
          title: 'Core Learning',
          items: [
            'Mathematics: numbers, patterns, measurement, and problem-solving',
            'Science: observation, exploration, and hands-on discovery',
            'Social Studies: community, citizenship, cultures, and the world around us',
            'Social-Emotional Learning: confidence, cooperation, independence, and kindness',
          ],
        },
      ],
      flyerSrc: '/assets/images/staff/ms-fatima-meet-teacher.jpg',
      flyerAlt: 'Meet the teacher flyer for Ms. Fatima Jazzar, Kindergarten Teacher at MUNA School of Pine Hill',
    },
  ] as StaffTeacher[],
};
