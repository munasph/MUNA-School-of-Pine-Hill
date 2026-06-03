import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ArrowLeft, LucideIconData, Trash2 } from 'lucide-angular';

import type { AdminAdmissionRecord, ApplicationStatus } from '../../../models/admin.model';
import {
  APPLICATION_STATUSES, STATUS_LABELS,
} from '../../../models/admin.model';
import { AdminAdmissionService } from '../../../services/admin-admission.service';

@Component({
  selector: 'app-admin-admission-detail',
  templateUrl: './admin-admission-detail.component.html',
  styleUrls: ['../admin-shared.css', './admin-admission-detail.component.css'],
})
export class AdminAdmissionDetailComponent implements OnInit, OnDestroy {
  readonly arrowLeft: LucideIconData = ArrowLeft;
  readonly trashIcon: LucideIconData = Trash2;
  readonly statuses = APPLICATION_STATUSES;
  readonly statusLabels = STATUS_LABELS;

  application: AdminAdmissionRecord | null = null;
  loading = true;
  saving = false;
  error: string | null = null;
  actionError: string | null = null;
  successMessage: string | null = null;

  statusForm!: FormGroup;
  private subs = new Subscription();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly adminService: AdminAdmissionService,
  ) {}

  ngOnInit(): void {
    this.statusForm = this.fb.group({
      status: ['', Validators.required],
    });

    this.subs.add(
      this.route.paramMap.subscribe((params) => {
        const id = Number(params.get('id'));
        if (!id) {
          this.router.navigate(['/admin/admissions']);
          return;
        }
        this.loadApplication(id);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  loadApplication(id: number): void {
    this.loading = true;
    this.error = null;

    this.subs.add(
      this.adminService.getApplication(id).subscribe({
        next: (app) => {
          this.application = app;
          this.statusForm.patchValue({ status: app.status });
          this.loading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;
          this.error = err.error?.message ?? 'Application not found.';
        },
      }),
    );
  }

  saveStatus(): void {
    if (!this.application || this.statusForm.invalid) return;

    this.saving = true;
    this.actionError = null;
    this.successMessage = null;
    const status = this.statusForm.value.status as ApplicationStatus;

    this.subs.add(
      this.adminService.updateStatus(this.application.id, status).subscribe({
        next: (updated) => {
          this.application = updated;
          this.saving = false;
          this.successMessage = 'Status updated.';
        },
        error: (err: HttpErrorResponse) => {
          this.saving = false;
          this.actionError = err.error?.message ?? 'Could not update status.';
        },
      }),
    );
  }

  deleteApplication(): void {
    if (!this.application) return;

    const confirmed = window.confirm(
      `Delete application ${this.application.applicationId}?`,
    );
    if (!confirmed) return;

    this.subs.add(
      this.adminService.deleteApplication(this.application.id).subscribe({
        next: () => this.router.navigate(['/admin/admissions']),
        error: (err: HttpErrorResponse) => {
          this.actionError = err.error?.message ?? 'Could not delete application.';
        },
      }),
    );
  }

  formatDate(value: string): string {
    return new Date(value).toLocaleString();
  }
}
