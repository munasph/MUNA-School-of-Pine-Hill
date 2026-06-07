import type { FacultyMember } from '../../models/about.model';

export const keyFaculty: FacultyMember[] = [
  { name: 'Br Mohammad Kabir',      role: 'Founding Team', expertise: '', photo: 'https://picsum.photos/seed/msph-team-1/400/400' },
  { name: 'Br Waseem',              role: 'Founding Team', expertise: '', photo: 'https://picsum.photos/seed/msph-team-2/400/400' },
  { name: 'Dr Liakat Ali Chowdhury', role: 'Founding Team', expertise: '', photo: 'https://picsum.photos/seed/msph-team-3/400/400' },
];

/** Hidden until real faculty photos are added — section shows when this array is non-empty. */
export const teachingFacultyPhotos: { id: number; src: string; alt: string }[] = [];
