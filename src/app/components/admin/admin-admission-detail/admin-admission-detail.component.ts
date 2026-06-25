import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ArrowLeft, Download, LucideIconData, Trash2 } from 'lucide-angular';

import type { AdminAdmissionDocument, AdminAdmissionRecord, ApplicationStatus } from '../../../models/admin.model';
import {
  APPLICATION_STATUSES, STATUS_LABELS,
} from '../../../models/admin.model';
import {
  ADMISSION_DOCUMENT_FIELDS,
  ADMISSION_DOCUMENT_GROUPS,
  type AdmissionDocumentField,
} from '../../admission/admission-documents.data';
import { AdminAdmissionService } from '../../../services/admin-admission.service';
import { AdminFeedbackService } from '../../../services/admin-feedback.service';

@Component({
  selector: 'app-admin-admission-detail',
  templateUrl: './admin-admission-detail.component.html',
  styleUrls: ['../admin-shared.css', './admin-admission-detail.component.css'],
})
export class AdminAdmissionDetailComponent implements OnInit, OnDestroy {
  readonly arrowLeft: LucideIconData = ArrowLeft;
  readonly trashIcon: LucideIconData = Trash2;
  readonly downloadIcon: LucideIconData = Download;
  readonly statuses = APPLICATION_STATUSES;
  readonly statusLabels = STATUS_LABELS;
  readonly documentGroups = ADMISSION_DOCUMENT_GROUPS;

  application: AdminAdmissionRecord | null = null;
  documents: AdminAdmissionDocument[] = [];
  loading = true;
  saving = false;
  downloadingId: number | null = null;
  error: string | null = null;
  actionError: string | null = null;

  statusForm!: FormGroup;
  private subs = new Subscription();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly adminService: AdminAdmissionService,
    private readonly feedback: AdminFeedbackService,
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
      forkJoin({
        app: this.adminService.getApplication(id),
        docs: this.adminService.listDocuments(id).pipe(catchError(() => of([]))),
      }).subscribe({
        next: ({ app, docs }) => {
          this.application = app;
          this.documents = docs;
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
    const status = this.statusForm.value.status as ApplicationStatus;

    this.subs.add(
      this.adminService.updateStatus(this.application.id, status).subscribe({
        next: (updated) => {
          this.application = { ...this.application!, ...updated };
          this.saving = false;
          this.feedback.showSuccess('Application status has been updated.', 'Status saved');
        },
        error: (err: HttpErrorResponse) => {
          this.saving = false;
          this.feedback.showError(err.error?.message ?? 'Could not update status.', 'Update failed');
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
          this.feedback.showError(err.error?.message ?? 'Could not delete application.', 'Delete failed');
        },
      }),
    );
  }

  documentsForGroup(groupId: 'required' | 'school'): AdmissionDocumentField[] {
    return ADMISSION_DOCUMENT_FIELDS.filter((d) => d.group === groupId);
  }

  documentForType(docType: string): AdminAdmissionDocument | undefined {
    return this.documents.find((d) => d.docType === docType);
  }

  downloadDocument(doc: AdminAdmissionDocument): void {
    this.downloadingId = doc.id;
    this.actionError = null;

    this.subs.add(
      this.adminService.downloadDocument(doc.id).subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.href = url;
          anchor.download = doc.fileName || `${doc.docType}.file`;
          anchor.click();
          window.URL.revokeObjectURL(url);
          this.downloadingId = null;
        },
        error: () => {
          this.downloadingId = null;
          this.actionError = 'Could not download file.';
        },
      }),
    );
  }

  display(value: string | null | undefined): string {
    return value?.trim() ? value.trim() : '—';
  }

  formatAddress(app: AdminAdmissionRecord): string {
    const parts = [app.streetAddress, app.city, app.state, app.zip]
      .map((p) => p?.trim())
      .filter(Boolean);
    return parts.length ? parts.join(', ') : '—';
  }

  formatDate(value: string): string {
    return new Date(value).toLocaleString();
  }
}
