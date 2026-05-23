import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from 'rxjs';

import type {
  ClassOption, AdmissionApplication,
  AdmissionSuccessMessage, AdmissionSubmitResponse,
} from '../models/admission.model';
import { classOptions, ADMISSION_SUCCESS } from '../data/admission';

@Injectable({ providedIn: 'root' })
export class AdmissionService {
  private readonly endpoint = '/api/admission';

  constructor(private readonly http: HttpClient) {}

  /** Class-of-applying dropdown options, with the leading "Select Class" sentinel. */
  getClassOptions(): Observable<ClassOption[]> {
    return of([{ value: '', label: 'Select Class' }, ...classOptions]);
  }

  /** Static success-screen copy. */
  getSuccessMessage(): Observable<AdmissionSuccessMessage> {
    return of(ADMISSION_SUCCESS);
  }

  /**
   * Submit a new admission application.
   *
   * Currently a 600 ms-delayed stub that always succeeds. To wire a real backend,
   * replace the body with:
   *
   *   return this.http.post<AdmissionSubmitResponse>(this.endpoint, payload);
   */
  submitApplication(payload: AdmissionApplication): Observable<AdmissionSubmitResponse> {
    // Touch payload so the eventual real call doesn't get flagged as unused.
    void payload;
    return of<AdmissionSubmitResponse>({
      success:       true,
      applicationId: `MUNA-${Date.now()}`,
      message:       'Application received.',
    }).pipe(delay(600));
  }
}
