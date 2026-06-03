import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import type { CmsAdminModuleConfig } from '../config/cms-admin.config';
import type {
  AnalyticsSettings, AuditLogRecord, CmsModuleInfo, CmsRecord,
  NotificationSettings,
} from '../models/cms-features.model';
import { apiUrl } from '../utils/api-url';

@Injectable({ providedIn: 'root' })
export class AdminCmsApiService {
  constructor(private readonly http: HttpClient) {}

  listModules(): Observable<CmsModuleInfo[]> {
    return this.http.get<CmsModuleInfo[]>(apiUrl('/api/admin/modules'));
  }

  list<T extends CmsRecord>(config: CmsAdminModuleConfig): Observable<T[]> {
    return this.http.get<T[]>(apiUrl(config.apiPath));
  }

  get<T extends CmsRecord>(config: CmsAdminModuleConfig, id: number): Observable<T> {
    return this.http.get<T>(apiUrl(`${config.apiPath}/${id}`));
  }

  create<T extends CmsRecord>(config: CmsAdminModuleConfig, payload: CmsRecord): Observable<T> {
    return this.http.post<T>(apiUrl(config.apiPath), payload);
  }

  update<T extends CmsRecord>(config: CmsAdminModuleConfig, id: number, payload: CmsRecord): Observable<T> {
    return this.http.put<T>(apiUrl(`${config.apiPath}/${id}`), payload);
  }

  delete(config: CmsAdminModuleConfig, id: number): Observable<void> {
    return this.http.delete<void>(apiUrl(`${config.apiPath}/${id}`));
  }

  getNotifications(): Observable<NotificationSettings> {
    return this.http.get<NotificationSettings>(apiUrl('/api/admin/notifications'));
  }

  updateNotifications(payload: NotificationSettings): Observable<NotificationSettings> {
    return this.http.put<NotificationSettings>(apiUrl('/api/admin/notifications'), payload);
  }

  getAnalytics(): Observable<AnalyticsSettings> {
    return this.http.get<AnalyticsSettings>(apiUrl('/api/admin/analytics'));
  }

  updateAnalytics(payload: AnalyticsSettings): Observable<AnalyticsSettings> {
    return this.http.put<AnalyticsSettings>(apiUrl('/api/admin/analytics'), payload);
  }

  listAuditLogs(): Observable<AuditLogRecord[]> {
    return this.http.get<AuditLogRecord[]>(apiUrl('/api/admin/audit-logs'));
  }
}
