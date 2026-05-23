import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from 'rxjs';

import type {
  ContactInfo, ContactMessage, ContactSubmitResponse,
} from '../models/contact.model';
import { SCHOOL_INFO } from '../components/footer/site.data';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly endpoint = '/api/contact';

  constructor(private readonly http: HttpClient) {}

  /** Static contact card data sourced from `SCHOOL_INFO`. */
  getInfo(): Observable<ContactInfo> {
    const i = SCHOOL_INFO;
    return of<ContactInfo>({
      address:     i.address,
      phone:       i.phone,
      phoneHref:   i.phoneHref,
      email:       i.email,
      emailHref:   i.emailHref,
      officeHours: i.officeHours,
      mapQuery:    i.mapQuery,
    });
  }

  /**
   * Send a contact-form message.
   *
   * Currently a 500 ms-delayed stub. Swap to:
   *   `return this.http.post<ContactSubmitResponse>(this.endpoint, payload);`
   * when a backend exists.
   */
  sendMessage(payload: ContactMessage): Observable<ContactSubmitResponse> {
    void payload;
    return of<ContactSubmitResponse>({
      success:   true,
      messageId: `MSG-${Date.now()}`,
      message:   'Message received. We will reach out within 24 hours.',
    }).pipe(delay(500));
  }
}
