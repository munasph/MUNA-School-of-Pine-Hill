import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import type {
  AdminContactInquiry, ContactInquiryStatus,
} from '../models/admin.model';
import { apiUrl } from '../utils/api-url';

@Injectable({ providedIn: 'root' })
export class AdminContactService {
  private readonly endpoint = apiUrl('/api/admin/contacts');

  constructor(private readonly http: HttpClient) {}

  listInquiries(status?: ContactInquiryStatus | ''): Observable<AdminContactInquiry[]> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<AdminContactInquiry[]>(this.endpoint, { params });
  }

  getInquiry(id: number): Observable<AdminContactInquiry> {
    return this.http.get<AdminContactInquiry>(`${this.endpoint}/${id}`);
  }

  updateStatus(id: number, status: ContactInquiryStatus): Observable<AdminContactInquiry> {
    return this.http.patch<AdminContactInquiry>(`${this.endpoint}/${id}/status`, { status });
  }

  deleteInquiry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
