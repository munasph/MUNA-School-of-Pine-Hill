import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import type { SiteSettingsPayload } from '../../../models/site-settings.model';
import { AdminSiteSettingsService } from '../../../services/admin-site-settings.service';
import { AdminFeedbackService } from '../../../services/admin-feedback.service';
import { SchoolInfoService } from '../../../services/school-info.service';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['../admin-shared.css', './admin-settings.component.css'],
})
export class AdminSettingsComponent implements OnInit, OnDestroy {
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
      admissionsOpen:             [true],
      admissionDocumentsRequired: [false],
    });

    this.loadSettings();
  }

  ngOnDestroy(): void {
    if (this.saveSuccessTimer) {
      clearTimeout(this.saveSuccessTimer);
    }
    this.subs.unsubscribe();
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

  private normalizeSettings(settings: SiteSettingsPayload): SiteSettingsPayload {
    return {
      ...settings,
      admissionsOpen:             settings.admissionsOpen ?? true,
      admissionDocumentsRequired: settings.admissionDocumentsRequired ?? false,
    };
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.saveSucceeded = false;
    const payload = this.form.value as SiteSettingsPayload;

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
