import type { FacultyMember } from '../../lib/types';

export const keyFaculty: FacultyMember[] = [
  { name: 'Team Member One',   role: 'Role placeholder', expertise: 'Expertise placeholder', photo: 'https://picsum.photos/seed/team-1/400/400' },
  { name: 'Team Member Two',   role: 'Role placeholder', expertise: 'Expertise placeholder', photo: 'https://picsum.photos/seed/team-2/400/400' },
  { name: 'Team Member Three', role: 'Role placeholder', expertise: 'Expertise placeholder', photo: 'https://picsum.photos/seed/team-3/400/400' },
  { name: 'Team Member Four',  role: 'Role placeholder', expertise: 'Expertise placeholder', photo: 'https://picsum.photos/seed/team-4/400/400' },
];

export const teachingFacultyCount = 8;

export const teachingFacultyPhotos = Array.from({ length: teachingFacultyCount }, (_, i) => ({
  id:  i + 1,
  src: `https://picsum.photos/seed/team-carousel-${i + 1}/400/400`,
  alt: 'Team member placeholder',
}));
