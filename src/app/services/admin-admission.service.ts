import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import type {
  AdminAdmissionRecord, AdminDashboardStats, ApplicationStatus,
} from '../models/admin.model';

@Injectable({ providedIn: 'root' })
export class AdminAdmissionService {
  private readonly endpoint = '/api/admin/admissions';

  constructor(private readonly http: HttpClient) {}

  getDashboardStats(): Observable<AdminDashboardStats> {
    return this.http.get<AdminDashboardStats>('/api/admin/dashboard');
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
