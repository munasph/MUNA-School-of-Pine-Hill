import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import type {
  AboutContent, AboutHero, VisionItem,
  FacultyMember, TeachingFacultyPhoto,
} from '../models/about.model';
import { ABOUT_HERO, visionItems } from '../components/about/about.data';
import { keyFaculty, staffMembers, teachingFacultyPhotos } from '../components/about/faculty.data';

@Injectable({ providedIn: 'root' })
export class AboutService {
  private readonly endpoint = '/api/about';

  constructor(private readonly http: HttpClient) {}

  getContent(): Observable<AboutContent> {
    return of<AboutContent>({
      hero:            ABOUT_HERO,
      visionItems,
      keyFaculty,
      staffMembers,
      teachingFaculty: teachingFacultyPhotos,
    });
  }

  getHero():            Observable<AboutHero>             { return of(ABOUT_HERO); }
  getVisionItems():     Observable<VisionItem[]>          { return of(visionItems); }
  getKeyFaculty():      Observable<FacultyMember[]>       { return of(keyFaculty); }
  getStaffMembers():    Observable<FacultyMember[]>       { return of(staffMembers); }
  getTeachingFaculty(): Observable<TeachingFacultyPhoto[]> { return of(teachingFacultyPhotos); }
}
