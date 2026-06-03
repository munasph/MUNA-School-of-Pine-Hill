import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Eye, LucideIconData, RefreshCw, Trash2 } from 'lucide-angular';

import type { AdminContactInquiry, ContactInquiryStatus } from '../../../models/admin.model';
import {
  CONTACT_INQUIRY_STATUSES, CONTACT_STATUS_LABELS,
} from '../../../models/admin.model';
import { AdminContactService } from '../../../services/admin-contact.service';

@Component({
  selector: 'app-admin-inquiries',
  templateUrl: './admin-inquiries.component.html',
  styleUrls: ['../admin-shared.css', './admin-inquiries.component.css'],
})
export class AdminInquiriesComponent implements OnInit, OnDestroy {
  readonly refreshIcon: LucideIconData = RefreshCw;
  readonly trashIcon: LucideIconData = Trash2;
  readonly eyeIcon: LucideIconData = Eye;
  readonly statuses = CONTACT_INQUIRY_STATUSES;
  readonly statusLabels = CONTACT_STATUS_LABELS;

  inquiries: AdminContactInquiry[] = [];
  statusFilter: ContactInquiryStatus | '' = '';
  loading = false;
  error: string | null = null;
  actionError: string | null = null;

  private subs = new Subscription();

  constructor(
    private readonly adminService: AdminContactService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  loadAll(): void {
    this.loading = true;
    this.error = null;

    this.subs.add(
      this.adminService.listInquiries(this.statusFilter).subscribe({
        next: (rows) => {
          this.inquiries = rows;
          this.loading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;
          this.inquiries = [];
          if (err.status === 404) {
            this.error = 'Inquiries API not found — restart the backend (./run-dev.sh) so the latest code is running.';
          } else if (err.status === 401 || err.status === 403) {
            this.error = 'Session expired or unauthorized — log out and sign in again.';
          } else {
            this.error = err.error?.message ?? 'Could not load inquiries.';
          }
        },
      }),
    );
  }

  onFilterChange(value: string): void {
    this.statusFilter = value as ContactInquiryStatus | '';
    this.loadAll();
  }

  onStatusChange(inquiry: AdminContactInquiry, status: ContactInquiryStatus): void {
    if (inquiry.status === status) return;

    this.actionError = null;
    this.subs.add(
      this.adminService.updateStatus(inquiry.id, status).subscribe({
        next: (updated) => {
          inquiry.status = updated.status;
        },
        error: (err: HttpErrorResponse) => {
          this.actionError = err.error?.message ?? 'Could not update status.';
        },
      }),
    );
  }

  deleteInquiry(inquiry: AdminContactInquiry, event?: Event): void {
    event?.stopPropagation();
    const confirmed = window.confirm(
      `Delete inquiry ${inquiry.messageId} from ${inquiry.name}?`,
    );
    if (!confirmed) return;

    this.actionError = null;
    this.subs.add(
      this.adminService.deleteInquiry(inquiry.id).subscribe({
        next: () => this.loadAll(),
        error: (err: HttpErrorResponse) => {
          this.actionError = err.error?.message ?? 'Could not delete inquiry.';
        },
      }),
    );
  }

  openInquiry(id: number): void {
    this.router.navigate(['/admin/inquiries', id]);
  }

  formatDate(value: string): string {
    return new Date(value).toLocaleString();
  }
}
