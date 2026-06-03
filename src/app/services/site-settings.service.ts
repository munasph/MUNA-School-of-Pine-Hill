import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import type { SiteSettings } from '../models/site-settings.model';

@Injectable({ providedIn: 'root' })
export class SiteSettingsService {
  private readonly endpoint = '/api/site-settings';

  constructor(private readonly http: HttpClient) {}

  getSettings(): Observable<SiteSettings> {
    return this.http.get<SiteSettings>(this.endpoint);
  }
}
