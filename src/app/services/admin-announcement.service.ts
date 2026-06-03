import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import type {
  AdminAnnouncementRecord, AnnouncementPayload,
} from '../models/admin.model';
import { apiUrl } from '../utils/api-url';

@Injectable({ providedIn: 'root' })
export class AdminAnnouncementService {
  private readonly endpoint = apiUrl('/api/admin/announcements');

  constructor(private readonly http: HttpClient) {}

  listAnnouncements(): Observable<AdminAnnouncementRecord[]> {
    return this.http.get<AdminAnnouncementRecord[]>(this.endpoint);
  }

  getAnnouncement(id: number): Observable<AdminAnnouncementRecord> {
    return this.http.get<AdminAnnouncementRecord>(`${this.endpoint}/${id}`);
  }

  createAnnouncement(payload: AnnouncementPayload): Observable<AdminAnnouncementRecord> {
    return this.http.post<AdminAnnouncementRecord>(this.endpoint, payload);
  }

  updateAnnouncement(id: number, payload: AnnouncementPayload): Observable<AdminAnnouncementRecord> {
    return this.http.put<AdminAnnouncementRecord>(`${this.endpoint}/${id}`, payload);
  }

  deleteAnnouncement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
