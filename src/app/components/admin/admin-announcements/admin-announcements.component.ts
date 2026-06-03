import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Megaphone, LucideIconData, Plus, RefreshCw, Trash2 } from 'lucide-angular';

import type { AdminAnnouncementRecord } from '../../../models/admin.model';
import { AdminAnnouncementService } from '../../../services/admin-announcement.service';

@Component({
  selector: 'app-admin-announcements',
  templateUrl: './admin-announcements.component.html',
  styleUrls: ['../admin-shared.css', './admin-announcements.component.css'],
})
export class AdminAnnouncementsComponent implements OnInit, OnDestroy {
  readonly megaphoneIcon: LucideIconData = Megaphone;
  readonly plusIcon: LucideIconData = Plus;
  readonly refreshIcon: LucideIconData = RefreshCw;
  readonly trashIcon: LucideIconData = Trash2;

  announcements: AdminAnnouncementRecord[] = [];
  loading = false;
  error: string | null = null;
  actionError: string | null = null;

  private subs = new Subscription();

  constructor(
    private readonly adminService: AdminAnnouncementService,
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
      this.adminService.listAnnouncements().subscribe({
        next: (rows) => {
          this.announcements = rows;
          this.loading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;
          this.error = err.error?.message ?? 'Could not load announcements.';
        },
      }),
    );
  }

  openAnnouncement(id: number): void {
    this.router.navigate(['/admin/announcements', id]);
  }

  deleteAnnouncement(record: AdminAnnouncementRecord, event: Event): void {
    event.stopPropagation();

    const confirmed = window.confirm(`Delete announcement "${record.title}"?`);
    if (!confirmed) return;

    this.actionError = null;
    this.subs.add(
      this.adminService.deleteAnnouncement(record.id).subscribe({
        next: () => this.loadAll(),
        error: (err: HttpErrorResponse) => {
          this.actionError = err.error?.message ?? 'Could not delete announcement.';
        },
      }),
    );
  }

  formatDate(value: string): string {
    return new Date(value).toLocaleString();
  }
}
