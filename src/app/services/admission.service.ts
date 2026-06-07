import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import type {
  ClassOption, AdmissionApplication,
  AdmissionSuccessMessage, AdmissionSubmitResponse,
  AdmissionDocumentUpload,
} from '../models/admission.model';
import { classOptions, ADMISSION_SUCCESS } from '../components/admission/admission.data';
import { apiUrl } from '../utils/api-url';

@Injectable({ providedIn: 'root' })
export class AdmissionService {
  private readonly endpoint = apiUrl('/api/admission');

  constructor(private readonly http: HttpClient) {}

  /** Class-of-applying dropdown options, with the leading "Select Class" sentinel. */
  getClassOptions(): Observable<ClassOption[]> {
    return of([{ value: '', label: 'Select Class' }, ...classOptions]);
  }

  /** Static success-screen copy. */
  getSuccessMessage(): Observable<AdmissionSuccessMessage> {
    return of(ADMISSION_SUCCESS);
  }

  submitApplication(payload: AdmissionApplication): Observable<AdmissionSubmitResponse> {
    return this.http.post<AdmissionSubmitResponse>(this.endpoint, payload);
  }

  submitApplicationWithDocuments(
    payload: AdmissionApplication,
    documents: AdmissionDocumentUpload[],
  ): Observable<AdmissionSubmitResponse> {
    const formData = new FormData();
    formData.append(
      'application',
      new Blob([JSON.stringify(payload)], { type: 'application/json' }),
    );

    for (const doc of documents) {
      formData.append('files', doc.file, doc.file.name);
      formData.append('docTypes', doc.docType);
    }

    return this.http.post<AdmissionSubmitResponse>(`${this.endpoint}/with-documents`, formData);
  }
}
