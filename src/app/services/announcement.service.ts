import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import type { Announcement } from '../models/announcement.model';
import { apiUrl } from '../utils/api-url';

@Injectable({ providedIn: 'root' })
export class AnnouncementService {
  private readonly endpoint = apiUrl('/api/announcements/active');

  constructor(private readonly http: HttpClient) {}

  getActiveAnnouncements(limit = 3): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(this.endpoint).pipe(
      map((items) => items.slice(0, limit)),
      catchError(() => of([])),
    );
  }

  getAnnouncement(id: number): Observable<Announcement> {
    return this.http.get<Announcement>(apiUrl(`/api/announcements/${id}`));
  }

  getLatestAnnouncement(): Observable<Announcement | null> {
    return this.getActiveAnnouncements(1).pipe(
      map((items) => (items.length ? items[0] : null)),
    );
  }
}
