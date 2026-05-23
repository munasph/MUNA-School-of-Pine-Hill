import type { FacultyMember } from '../lib/types';

/**
 * Faculty data feeding the About page (key faculty grid + carousel).
 * TODO ⟶ Replace these placeholders with your real faculty members
 *        and host their photos under /assets/images/faculty/.
 */
export const keyFaculty: FacultyMember[] = [
  { name: 'Faculty Member 1', role: 'Department Head',  expertise: 'Subject specialism',  photo: 'https://picsum.photos/seed/faculty1/400/400' },
  { name: 'Faculty Member 2', role: 'Senior Lecturer',  expertise: 'Subject specialism',  photo: 'https://picsum.photos/seed/faculty2/400/400' },
  { name: 'Faculty Member 3', role: 'Department Lead',  expertise: 'Subject specialism',  photo: 'https://picsum.photos/seed/faculty3/400/400' },
  { name: 'Faculty Member 4', role: 'Department Head',  expertise: 'Subject specialism',  photo: 'https://picsum.photos/seed/faculty4/400/400' },
];

export const teachingFacultyCount = 8;

export const teachingFacultyPhotos = Array.from({ length: teachingFacultyCount }, (_, i) => ({
  id:  i + 1,
  src: `https://picsum.photos/seed/faculty-${i + 1}/400/400`,
  alt: 'Teaching faculty member',
}));
