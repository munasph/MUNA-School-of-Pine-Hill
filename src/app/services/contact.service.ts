import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import type {
  ContactInfo, ContactMessage, ContactSubmitResponse,
} from '../models/contact.model';
import { SchoolInfoService } from './school-info.service';
import { apiUrl } from '../utils/api-url';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly endpoint = apiUrl('/api/contact');

  constructor(
    private readonly http: HttpClient,
    private readonly schoolInfo: SchoolInfoService,
  ) {}

  getInfo(): Observable<ContactInfo> {
    return this.schoolInfo.schoolInfo$.pipe(
      map((i) => ({
        address:     i.address,
        phone:       i.phone,
        phoneHref:   i.phoneHref,
        email:       i.email,
        emailHref:   i.emailHref,
        officeHours: i.officeHours,
        mapQuery:    i.mapQuery,
      })),
    );
  }

  sendMessage(payload: ContactMessage): Observable<ContactSubmitResponse> {
    return this.http.post<ContactSubmitResponse>(this.endpoint, payload);
  }
}
