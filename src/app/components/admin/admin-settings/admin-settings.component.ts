import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import type { SiteSettingsPayload } from '../../../models/site-settings.model';
import { AdminSiteSettingsService } from '../../../services/admin-site-settings.service';
import { AdminFeedbackService } from '../../../services/admin-feedback.service';
import { SchoolInfoService } from '../../../services/school-info.service';
import {
  ADMISSION_DOCUMENT_FIELDS,
  ADMISSION_DOCUMENT_GROUPS,
  type AdmissionDocumentField,
} from '../../admission/admission-documents.data';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['../admin-shared.css', './admin-settings.component.css'],
})
export class AdminSettingsComponent implements OnInit, OnDestroy {
  readonly documentFields = ADMISSION_DOCUMENT_FIELDS;
  readonly documentGroups = ADMISSION_DOCUMENT_GROUPS;

  form!: FormGroup;
  loading = true;
  saving = false;
  error: string | null = null;
  saveSucceeded = false;

  private subs = new Subscription();
  private saveSuccessTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly settingsService: AdminSiteSettingsService,
    private readonly schoolInfoService: SchoolInfoService,
    private readonly feedback: AdminFeedbackService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name:           ['', Validators.required],
      shortName:      ['', Validators.required],
      foundedYear:    [''],
      address:        [''],
      phone:          [''],
      email:          ['', [Validators.required, Validators.email]],
      officeHours:    [''],
      baseUrl:        [''],
      admissionsOpen: [true],
      documentRequirements: this.fb.group(
        Object.fromEntries(
          ADMISSION_DOCUMENT_FIELDS.map((field) => [field.type, this.fb.control(false)]),
        ),
      ),
    });

    this.loadSettings();
  }

  ngOnDestroy(): void {
    if (this.saveSuccessTimer) {
      clearTimeout(this.saveSuccessTimer);
    }
    this.subs.unsubscribe();
  }

  documentsForGroup(group: AdmissionDocumentField['group']): AdmissionDocumentField[] {
    return this.documentFields.filter((field) => field.group === group);
  }

  enabledDocumentCount(): number {
    const group = this.form.get('documentRequirements') as FormGroup | null;
    if (!group) {
      return 0;
    }
    return this.documentFields.filter((field) => group.get(field.type)?.value).length;
  }

  setGroupEnabled(group: AdmissionDocumentField['group'], enabled: boolean): void {
    const docGroup = this.form.get('documentRequirements') as FormGroup | null;
    if (!docGroup) {
      return;
    }
    for (const field of this.documentsForGroup(group)) {
      docGroup.get(field.type)?.setValue(enabled);
    }
  }

  loadSettings(): void {
    this.loading = true;
    this.error = null;

    this.subs.add(
      this.settingsService.getSettings().subscribe({
        next: (settings) => {
          this.form.patchValue(this.normalizeSettings(settings));
          this.loading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;
          this.error = err.error?.message ?? 'Could not load site settings.';
        },
      }),
    );
  }

  private normalizeSettings(settings: SiteSettingsPayload): Record<string, unknown> {
    const enabledTypes = new Set(this.resolveRequiredDocumentTypes(settings));
    const documentRequirements = Object.fromEntries(
      ADMISSION_DOCUMENT_FIELDS.map((field) => [field.type, enabledTypes.has(field.type)]),
    );

    return {
      name:           settings.name,
      shortName:      settings.shortName,
      foundedYear:    settings.foundedYear,
      address:        settings.address,
      phone:          settings.phone,
      email:          settings.email,
      officeHours:    settings.officeHours,
      baseUrl:        settings.baseUrl,
      admissionsOpen: settings.admissionsOpen ?? true,
      documentRequirements,
    };
  }

  private resolveRequiredDocumentTypes(settings: SiteSettingsPayload): string[] {
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

  private buildPayload(): SiteSettingsPayload {
    const raw = this.form.getRawValue() as Record<string, unknown>;
    const docGroup = this.form.get('documentRequirements') as FormGroup;
    const admissionRequiredDocumentTypes = ADMISSION_DOCUMENT_FIELDS
      .filter((field) => docGroup.get(field.type)?.value)
      .map((field) => field.type);

    return {
      name:           raw['name'] as string,
      shortName:      raw['shortName'] as string,
      foundedYear:    raw['foundedYear'] as string,
      address:        raw['address'] as string,
      phone:          raw['phone'] as string,
      email:          raw['email'] as string,
      officeHours:    raw['officeHours'] as string,
      baseUrl:        raw['baseUrl'] as string,
      admissionsOpen: raw['admissionsOpen'] as boolean,
      admissionDocumentsRequired: admissionRequiredDocumentTypes.length > 0,
      admissionRequiredDocumentTypes,
    };
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.saveSucceeded = false;
    const payload = this.buildPayload();

    this.subs.add(
      this.settingsService.updateSettings(payload).subscribe({
        next: (updated) => {
          this.form.patchValue(this.normalizeSettings(updated));
          this.schoolInfoService.reload();
          this.saving = false;
          this.saveSucceeded = true;
          this.feedback.showSuccess(
            'Your site settings are live on the public website.',
            'Settings saved',
          );
          if (this.saveSuccessTimer) {
            clearTimeout(this.saveSuccessTimer);
          }
          this.saveSuccessTimer = setTimeout(() => (this.saveSucceeded = false), 2500);
        },
        error: (err: HttpErrorResponse) => {
          this.saving = false;
          this.feedback.showError(
            err.error?.message ?? 'Could not save settings. Please try again.',
            'Save failed',
          );
        },
      }),
    );
  }
}
