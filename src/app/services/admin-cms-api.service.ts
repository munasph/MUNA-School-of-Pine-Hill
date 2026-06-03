import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import type { CmsAdminModuleConfig } from '../config/cms-admin.config';
import type {
  AnalyticsSettings, AuditLogRecord, CmsModuleInfo, CmsRecord,
  NotificationSettings,
} from '../models/cms-features.model';

@Injectable({ providedIn: 'root' })
export class AdminCmsApiService {
  constructor(private readonly http: HttpClient) {}

  listModules(): Observable<CmsModuleInfo[]> {
    return this.http.get<CmsModuleInfo[]>('/api/admin/modules');
  }

  list<T extends CmsRecord>(config: CmsAdminModuleConfig): Observable<T[]> {
    return this.http.get<T[]>(config.apiPath);
  }

  get<T extends CmsRecord>(config: CmsAdminModuleConfig, id: number): Observable<T> {
    return this.http.get<T>(`${config.apiPath}/${id}`);
  }

  create<T extends CmsRecord>(config: CmsAdminModuleConfig, payload: CmsRecord): Observable<T> {
    return this.http.post<T>(config.apiPath, payload);
  }

  update<T extends CmsRecord>(config: CmsAdminModuleConfig, id: number, payload: CmsRecord): Observable<T> {
    return this.http.put<T>(`${config.apiPath}/${id}`, payload);
  }

  delete(config: CmsAdminModuleConfig, id: number): Observable<void> {
    return this.http.delete<void>(`${config.apiPath}/${id}`);
  }

  getNotifications(): Observable<NotificationSettings> {
    return this.http.get<NotificationSettings>('/api/admin/notifications');
  }

  updateNotifications(payload: NotificationSettings): Observable<NotificationSettings> {
    return this.http.put<NotificationSettings>('/api/admin/notifications', payload);
  }

  getAnalytics(): Observable<AnalyticsSettings> {
    return this.http.get<AnalyticsSettings>('/api/admin/analytics');
  }

  updateAnalytics(payload: AnalyticsSettings): Observable<AnalyticsSettings> {
    return this.http.put<AnalyticsSettings>('/api/admin/analytics', payload);
  }

  listAuditLogs(): Observable<AuditLogRecord[]> {
    return this.http.get<AuditLogRecord[]>('/api/admin/audit-logs');
  }
}
