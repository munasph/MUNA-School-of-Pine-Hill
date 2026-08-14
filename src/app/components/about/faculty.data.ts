import type { FacultyMember } from '../../models/about.model';

export const keyFaculty: FacultyMember[] = [
  { name: 'Br Mohammad Kabir',       role: 'Founding Team', expertise: '', photo: 'https://picsum.photos/seed/msph-team-1/400/400' },
  { name: 'Br Waseem',               role: 'Founding Team', expertise: '', photo: 'https://picsum.photos/seed/msph-team-2/400/400' },
  { name: 'Dr Liakat Ali Chowdhury', role: 'Founding Team', expertise: '', photo: 'https://picsum.photos/seed/msph-team-3/400/400' },
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
