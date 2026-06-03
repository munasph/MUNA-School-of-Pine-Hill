import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import type { SiteSettings, SiteSettingsPayload } from '../models/site-settings.model';
import { apiUrl } from '../utils/api-url';

@Injectable({ providedIn: 'root' })
export class AdminSiteSettingsService {
  private readonly endpoint = apiUrl('/api/admin/site-settings');

  constructor(private readonly http: HttpClient) {}

  getSettings(): Observable<SiteSettings> {
    return this.http.get<SiteSettings>(this.endpoint);
  }

  updateSettings(payload: SiteSettingsPayload): Observable<SiteSettings> {
    return this.http.put<SiteSettings>(this.endpoint, payload);
  }
}
