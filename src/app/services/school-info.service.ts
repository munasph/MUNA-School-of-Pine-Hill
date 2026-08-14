import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { SCHOOL_INFO } from '../components/footer/site.data';
import type { SiteSettings } from '../models/site-settings.model';
import { ADMISSION_DOCUMENT_FIELDS } from '../components/admission/admission-documents.data';
import { apiUrl } from '../utils/api-url';

export interface SchoolInfo {
  name:            string;
  shortName:       string;
  foundedYear:     string;
  foundedDate:     string;
  address:         string;
  phone:           string;
  phoneHref:       string;
  email:           string;
  emailHref:       string;
  officeHours:     string;
  copyrightYear:   string;
  mapQuery:        string;
  baseUrl:                       string;
  admissionsOpen:                boolean;
  admissionDocumentsRequired:    boolean;
  admissionRequiredDocumentTypes: string[];
  campaignFlyerEnabled:          boolean;
}

const PLACEHOLDER_VALUES: Record<keyof Pick<
  SiteSettings,
  'name' | 'shortName' | 'foundedYear' | 'address' | 'phone' | 'email' | 'officeHours' | 'baseUrl'
>, string[]> = {
  name:        ['School Name'],
  shortName:   ['School'],
  foundedYear: ['0000', ''],
  address:     ['Street Address, City, State, Country', ''],
  phone:       ['Phone Number', ''],
  email:       ['email@example.com', ''],
  officeHours: ['Office Hours Placeholder', ''],
  baseUrl:     ['https://example.com', ''],
};

@Injectable({ providedIn: 'root' })
export class SchoolInfoService {
  private readonly endpoint = apiUrl('/api/site-settings');
  private readonly subject = new BehaviorSubject<SchoolInfo>(this.fromDefaults());

  readonly schoolInfo$ = this.subject.asObservable();

  constructor(private readonly http: HttpClient) {
    this.load().subscribe();
  }

  get snapshot(): SchoolInfo {
    return this.subject.value;
  }

  /** Raw API payload — used by admin settings form. */
  getSettings(): Observable<SiteSettings> {
    return this.http.get<SiteSettings>(this.endpoint);
  }

  load(): Observable<SchoolInfo> {
    return this.http.get<SiteSettings>(this.endpoint).pipe(
      map((settings) => this.mergeSettings(settings)),
      tap((info) => this.subject.next(info)),
      catchError(() => {
        const fallback = this.fromDefaults();
        this.subject.next(fallback);
        return of(fallback);
      }),
    );
  }

  reload(): void {
    this.load().subscribe();
  }

  private mergeSettings(settings: SiteSettings): SchoolInfo {
    const base = this.fromDefaults();

    const name        = this.pick(settings.name, base.name, 'name');
    const shortName   = this.pick(settings.shortName, base.shortName, 'shortName');
    const foundedYear = this.pick(settings.foundedYear, base.foundedYear, 'foundedYear');
    const address     = this.pick(settings.address, base.address, 'address');
    const phone       = this.pick(settings.phone, base.phone, 'phone');
    const email       = this.pick(settings.email, base.email, 'email');
    const officeHours = this.pick(settings.officeHours, base.officeHours, 'officeHours');
    const baseUrl     = this.pick(settings.baseUrl, base.baseUrl, 'baseUrl');

    return {
      name,
      shortName,
      foundedYear,
      foundedDate:    foundedYear,
      address,
      phone,
      phoneHref:      this.toPhoneHref(phone),
      email,
      emailHref:      email ? `mailto:${email}` : base.emailHref,
      officeHours,
      copyrightYear:  base.copyrightYear,
      mapQuery:       address,
      baseUrl,
      admissionsOpen:                 settings.admissionsOpen,
      admissionDocumentsRequired:     this.resolveRequiredDocumentTypes(settings).length > 0,
      admissionRequiredDocumentTypes: this.resolveRequiredDocumentTypes(settings),
      campaignFlyerEnabled:           settings.campaignFlyerEnabled ?? true,
    };
  }

  private resolveRequiredDocumentTypes(settings: SiteSettings): string[] {
    if (settings.admissionRequiredDocumentTypes?.length) {
      return settings.admissionRequiredDocumentTypes;
    }
    if (settings.admissionDocumentsRequired) {
      return ADMISSION_DOCUMENT_FIELDS
        .filter((field) => field.group === 'required')
        .map((field) => field.type);
    }
    return [];
  }

  private pick(value: string | null | undefined, fallback: string, field: keyof typeof PLACEHOLDER_VALUES): string {
    const trimmed = value?.trim() ?? '';
    if (!trimmed || PLACEHOLDER_VALUES[field].includes(trimmed)) {
      return fallback;
    }
    return trimmed;
  }

  private fromDefaults(): SchoolInfo {
    return {
      ...SCHOOL_INFO,
      admissionsOpen:                 true,
      admissionDocumentsRequired:     false,
      admissionRequiredDocumentTypes: [],
      campaignFlyerEnabled:           true,
    };
  }

  private toPhoneHref(phone: string): string {
    const digits = phone.replace(/\D/g, '');
    if (!digits) return SCHOOL_INFO.phoneHref;
    const normalized = digits.length === 10 ? `1${digits}` : digits;
    return `tel:+${normalized}`;
  }
}
