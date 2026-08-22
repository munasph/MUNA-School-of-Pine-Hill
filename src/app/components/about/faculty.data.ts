import type { FacultyMember } from '../../models/about.model';

export const keyFaculty: FacultyMember[] = [
  { name: 'Mohammad Kabir',           role: 'Founding Member', expertise: '', photo: 'https://picsum.photos/seed/msph-team-1/400/400' },
  { name: 'Liakat Ali Chowdhury',     role: 'Founding Member', expertise: '', photo: 'https://picsum.photos/seed/msph-team-2/400/400' },
  { name: 'Zubairul Azad',            role: 'Founding Member', expertise: '', photo: 'https://picsum.photos/seed/msph-team-3/400/400' },
  { name: 'Kazi Elias',               role: 'Founding Member', expertise: '', photo: 'https://picsum.photos/seed/msph-team-4/400/400' },
  { name: 'Ibrahim Khalil',           role: 'Founding Member', expertise: '', photo: '/assets/images/nature-portrait.jpg' },
  { name: 'Minhajul Azad',            role: 'Founding Member', expertise: '', photo: 'https://picsum.photos/seed/msph-team-6/400/400' },
  { name: 'Kazi Moinuddin',           role: 'Founding Member', expertise: '', photo: 'https://picsum.photos/seed/msph-team-7/400/400' },
  { name: 'Injamul Azad',             role: 'Founding Member', expertise: '', photo: 'https://picsum.photos/seed/msph-team-8/400/400' },
  { name: 'Kashif Khan',              role: 'Founding Member', expertise: '', photo: 'https://picsum.photos/seed/msph-team-9/400/400' },
  { name: 'Abu Sami Chukri Khorchid', role: 'Founding Member', expertise: '', photo: 'https://picsum.photos/seed/msph-team-10/400/400' },
  { name: 'Wasim Almajzoub',          role: 'Founding Member', expertise: '', photo: 'https://picsum.photos/seed/msph-team-11/400/400' },
];

export const staffMembers: FacultyMember[] = [
  {
    name: 'Chukri Khorchid',
    role: 'Acting Principal',
    expertise: '',
    photo: 'https://picsum.photos/seed/msph-staff-principal/400/400',
  },
  {
    name: 'Sr Alaa Madarati',
    role: 'Secretary',
    expertise: '',
    photo: '/assets/images/nature-portrait.jpg',
  },
  {
    name: 'Sr Fatima Jazzar',
    role: 'Kindergarten Teacher',
    expertise: '',
    photo: 'https://picsum.photos/seed/msph-staff-kg/400/400',
  },
];

/** Hidden until real faculty photos are added — section shows when this array is non-empty. */
export const teachingFacultyPhotos: { id: number; src: string; alt: string }[] = [];
