import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import type { SiteSettings } from '../models/site-settings.model';
import { SchoolInfoService } from './school-info.service';

/** @deprecated Prefer SchoolInfoService for UI; kept for admission toggle compatibility. */
@Injectable({ providedIn: 'root' })
export class SiteSettingsService {
  constructor(private readonly schoolInfo: SchoolInfoService) {}

  getSettings(): Observable<SiteSettings> {
    return this.schoolInfo.getSettings();
  }
}
