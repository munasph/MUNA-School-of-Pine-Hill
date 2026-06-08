import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import type { StaffInvitePayload, StaffMember } from '../models/staff.model';
import { apiUrl } from '../utils/api-url';

@Injectable({ providedIn: 'root' })
export class StaffService {
  private readonly endpoint = apiUrl('/api/admin/staff');

  constructor(private readonly http: HttpClient) {}

  listActive(): Observable<StaffMember[]> {
    return this.http.get<StaffMember[]>(this.endpoint);
  }

  listPending(): Observable<StaffMember[]> {
    return this.http.get<StaffMember[]>(`${this.endpoint}/pending`);
  }

  invite(payload: StaffInvitePayload): Observable<StaffMember> {
    return this.http.post<StaffMember>(`${this.endpoint}/invite`, payload);
  }

  approve(id: number): Observable<StaffMember> {
    return this.http.patch<StaffMember>(`${this.endpoint}/${id}/approve`, {});
  }

  reject(id: number): Observable<StaffMember> {
    return this.http.patch<StaffMember>(`${this.endpoint}/${id}/reject`, {});
  }
}
