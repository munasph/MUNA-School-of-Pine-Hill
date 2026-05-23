import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import type { LegalDocument, LegalKind } from '../models/legal.model';
import { SCHOOL_INFO } from '../data/site';

/**
 * Privacy + Terms content provider.
 *
 * The actual body copy currently lives in the page templates (privacy.component.html
 * and terms.component.html). This service ships the metadata (kind, title,
 * lastUpdated) and is the place to wire CMS-sourced legal documents later.
 */
@Injectable({ providedIn: 'root' })
export class LegalService {
  private readonly endpoint = '/api/legal';

  constructor(private readonly http: HttpClient) {}

  getDocument(kind: LegalKind): Observable<LegalDocument> {
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });

    if (kind === 'privacy') {
      return of<LegalDocument>({
        kind:        'privacy',
        title:       `${SCHOOL_INFO.name} Privacy Policy`,
        lastUpdated: today,
        sections:    [],
      });
    }

    return of<LegalDocument>({
      kind:        'terms',
      title:       `${SCHOOL_INFO.name} Terms of Service`,
      lastUpdated: today,
      sections:    [],
    });
  }
}
