import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import type {
  AdminAdmissionDocument, AdminAdmissionRecord, AdminDashboardStats, ApplicationStatus,
} from '../models/admin.model';
import { apiUrl } from '../utils/api-url';

@Injectable({ providedIn: 'root' })
export class AdminAdmissionService {
  private readonly endpoint = apiUrl('/api/admin/admissions');

  constructor(private readonly http: HttpClient) {}

  getDashboardStats(): Observable<AdminDashboardStats> {
    return this.http.get<AdminDashboardStats>(apiUrl('/api/admin/dashboard'));
  }

  listApplications(status?: ApplicationStatus | ''): Observable<AdminAdmissionRecord[]> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<AdminAdmissionRecord[]>(this.endpoint, { params });
  }

  getApplication(id: number): Observable<AdminAdmissionRecord> {
    return this.http.get<AdminAdmissionRecord>(`${this.endpoint}/${id}`);
  }

  listDocuments(applicationId: number): Observable<AdminAdmissionDocument[]> {
    return this.http.get<AdminAdmissionDocument[]>(
      apiUrl(`/api/admin/admissions/${applicationId}/documents`),
    );
  }

  downloadDocument(documentId: number): Observable<Blob> {
    return this.http.get(
      apiUrl(`/api/admin/admission-documents/${documentId}/download`),
      { responseType: 'blob' },
    );
  }

  updateStatus(id: number, status: ApplicationStatus): Observable<AdminAdmissionRecord> {
    return this.http.patch<AdminAdmissionRecord>(`${this.endpoint}/${id}/status`, { status });
  }

  deleteApplication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }

  exportCsv(status?: ApplicationStatus | ''): Observable<Blob> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get(`${this.endpoint}/export`, {
      params,
      responseType: 'blob',
    });
  }
}
