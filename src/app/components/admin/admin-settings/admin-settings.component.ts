import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import type { SiteSettingsPayload } from '../../../models/site-settings.model';
import { AdminSiteSettingsService } from '../../../services/admin-site-settings.service';

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
  actionError: string | null = null;
  successMessage: string | null = null;

  private subs = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly settingsService: AdminSiteSettingsService,
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
    });

    this.loadSettings();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  loadSettings(): void {
    this.loading = true;
    this.error = null;

    this.subs.add(
      this.settingsService.getSettings().subscribe({
        next: (settings) => {
          this.form.patchValue(settings);
          this.loading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;
          this.error = err.error?.message ?? 'Could not load site settings.';
        },
      }),
    );
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.actionError = null;
    this.successMessage = null;
    const payload = this.form.value as SiteSettingsPayload;

    this.subs.add(
      this.settingsService.updateSettings(payload).subscribe({
        next: (updated) => {
          this.form.patchValue(updated);
          this.saving = false;
          this.successMessage = 'Settings saved.';
        },
        error: (err: HttpErrorResponse) => {
          this.saving = false;
          this.actionError = err.error?.message ?? 'Could not save settings.';
        },
      }),
    );
  }
}
