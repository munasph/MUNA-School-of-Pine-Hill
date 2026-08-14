import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ACADEMIC_COPY } from '../components/academic/academic.data';

@Injectable({ providedIn: 'root' })
export class AcademicService {
  getContent(): Observable<typeof ACADEMIC_COPY> {
    return of(ACADEMIC_COPY);
  }
}
