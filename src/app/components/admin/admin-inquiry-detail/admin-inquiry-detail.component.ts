import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ArrowLeft, LucideIconData, Trash2 } from 'lucide-angular';

import type { AdminContactInquiry, ContactInquiryStatus } from '../../../models/admin.model';
import {
  CONTACT_INQUIRY_STATUSES, CONTACT_STATUS_LABELS,
} from '../../../models/admin.model';
import { AdminContactService } from '../../../services/admin-contact.service';
import { AdminFeedbackService } from '../../../services/admin-feedback.service';

@Component({
  selector: 'app-admin-inquiry-detail',
  templateUrl: './admin-inquiry-detail.component.html',
  styleUrls: ['../admin-shared.css', './admin-inquiry-detail.component.css'],
})
export class AdminInquiryDetailComponent implements OnInit, OnDestroy {
  readonly arrowLeft: LucideIconData = ArrowLeft;
  readonly trashIcon: LucideIconData = Trash2;
  readonly statuses = CONTACT_INQUIRY_STATUSES;
  readonly statusLabels = CONTACT_STATUS_LABELS;

  inquiry: AdminContactInquiry | null = null;
  loading = true;
  saving = false;
  error: string | null = null;

  statusForm!: FormGroup;
  private subs = new Subscription();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly adminService: AdminContactService,
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
          this.router.navigate(['/admin/inquiries']);
          return;
        }
        this.loadInquiry(id);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  loadInquiry(id: number): void {
    this.loading = true;
    this.error = null;

    this.subs.add(
      this.adminService.getInquiry(id).subscribe({
        next: (row) => {
          this.inquiry = row;
          this.statusForm.patchValue({ status: row.status });
          this.loading = false;

          if (row.status === 'NEW') {
            this.markAsRead(row);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;
          this.error = err.error?.message ?? 'Inquiry not found.';
        },
      }),
    );
  }

  private markAsRead(row: AdminContactInquiry): void {
    this.subs.add(
      this.adminService.updateStatus(row.id, 'READ').subscribe({
        next: (updated) => {
          this.inquiry = updated;
          this.statusForm.patchValue({ status: updated.status });
        },
        error: () => {},
      }),
    );
  }

  saveStatus(): void {
    if (!this.inquiry || this.statusForm.invalid) return;

    this.saving = true;
    const status = this.statusForm.value.status as ContactInquiryStatus;

    this.subs.add(
      this.adminService.updateStatus(this.inquiry.id, status).subscribe({
        next: (updated) => {
          this.inquiry = updated;
          this.saving = false;
          this.feedback.showSuccess('Inquiry status has been updated.', 'Status saved');
        },
        error: (err: HttpErrorResponse) => {
          this.saving = false;
          this.feedback.showError(err.error?.message ?? 'Could not update status.', 'Update failed');
        },
      }),
    );
  }

  deleteInquiry(): void {
    if (!this.inquiry) return;

    const confirmed = window.confirm(
      `Delete inquiry ${this.inquiry.messageId}?`,
    );
    if (!confirmed) return;

    this.subs.add(
      this.adminService.deleteInquiry(this.inquiry.id).subscribe({
        next: () => this.router.navigate(['/admin/inquiries']),
        error: (err: HttpErrorResponse) => {
          this.feedback.showError(err.error?.message ?? 'Could not delete inquiry.', 'Delete failed');
        },
      }),
    );
  }

  formatDate(value: string): string {
    return new Date(value).toLocaleString();
  }
}
