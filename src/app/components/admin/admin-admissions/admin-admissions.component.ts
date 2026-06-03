import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Download, Eye, LucideIconData, RefreshCw, Trash2 } from 'lucide-angular';

import type {
  AdminAdmissionRecord, AdminDashboardStats, ApplicationStatus,
} from '../../../models/admin.model';
import {
  APPLICATION_STATUSES, STATUS_LABELS,
} from '../../../models/admin.model';
import { AdminAdmissionService } from '../../../services/admin-admission.service';

@Component({
  selector: 'app-admin-admissions',
  templateUrl: './admin-admissions.component.html',
  styleUrls: ['../admin-shared.css', './admin-admissions.component.css'],
})
export class AdminAdmissionsComponent implements OnInit, OnDestroy {
  readonly refreshIcon: LucideIconData = RefreshCw;
  readonly downloadIcon: LucideIconData = Download;
  readonly trashIcon: LucideIconData = Trash2;
  readonly eyeIcon: LucideIconData = Eye;
  readonly statuses = APPLICATION_STATUSES;
  readonly statusLabels = STATUS_LABELS;

  applications: AdminAdmissionRecord[] = [];
  stats: AdminDashboardStats | null = null;
  statusFilter: ApplicationStatus | '' = '';
  loading = false;
  exporting = false;
  error: string | null = null;
  actionError: string | null = null;

  private subs = new Subscription();

  constructor(
    private readonly adminService: AdminAdmissionService,
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
      this.adminService.getDashboardStats().subscribe({
        next: (stats) => (this.stats = stats),
        error: () => (this.stats = null),
      }),
    );

    this.subs.add(
      this.adminService.listApplications(this.statusFilter).subscribe({
        next: (rows) => {
          this.applications = rows;
          this.loading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;
          this.error = err.error?.message ?? 'Could not load applications.';
        },
      }),
    );
  }

  onFilterChange(value: string): void {
    this.statusFilter = value as ApplicationStatus | '';
    this.loadAll();
  }

  onStatusChange(app: AdminAdmissionRecord, status: ApplicationStatus): void {
    if (app.status === status) return;

    this.actionError = null;
    this.subs.add(
      this.adminService.updateStatus(app.id, status).subscribe({
        next: (updated) => {
          app.status = updated.status;
          this.loadAll();
        },
        error: (err: HttpErrorResponse) => {
          this.actionError = err.error?.message ?? 'Could not update status.';
        },
      }),
    );
  }

  deleteApplication(app: AdminAdmissionRecord, event?: Event): void {
    event?.stopPropagation();
    const confirmed = window.confirm(
      `Delete application ${app.applicationId} for ${app.fullName}?`,
    );
    if (!confirmed) return;

    this.actionError = null;
    this.subs.add(
      this.adminService.deleteApplication(app.id).subscribe({
        next: () => this.loadAll(),
        error: (err: HttpErrorResponse) => {
          this.actionError = err.error?.message ?? 'Could not delete application.';
        },
      }),
    );
  }

  exportCsv(): void {
    this.exporting = true;
    this.actionError = null;

    this.subs.add(
      this.adminService.exportCsv(this.statusFilter).subscribe({
        next: (blob) => {
          const url = URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.href = url;
          anchor.download = 'admission-applications.csv';
          anchor.click();
          URL.revokeObjectURL(url);
          this.exporting = false;
        },
        error: (err: HttpErrorResponse) => {
          this.exporting = false;
          this.actionError = err.error?.message ?? 'Could not export CSV.';
        },
      }),
    );
  }

  openApplication(id: number): void {
    this.router.navigate(['/admin/admissions', id]);
  }

  formatDate(value: string): string {
    return new Date(value).toLocaleString();
  }
}
