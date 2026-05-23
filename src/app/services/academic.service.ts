import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import type {
  AcademicContent, Course, HigherSecondaryStream, Achievement,
} from '../models/academic.model';
import { courses, higherSecondary, achievements } from '../data/academic';

@Injectable({ providedIn: 'root' })
export class AcademicService {
  private readonly endpoint = '/api/academic';

  constructor(private readonly http: HttpClient) {}

  getContent(): Observable<AcademicContent> {
    return of<AcademicContent>({
      courses,
      higherSecondary,
      achievements,
    });
  }

  getCourses():         Observable<Course[]>                { return of(courses); }
  getHigherSecondary(): Observable<HigherSecondaryStream[]> { return of(higherSecondary); }
  getAchievements():    Observable<Achievement[]>           { return of(achievements); }
}
