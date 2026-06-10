import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ArrowLeft, LucideIconData, Pencil, Trash2 } from 'lucide-angular';

import type { AdminAnnouncementRecord, AnnouncementPayload } from '../../../models/admin.model';
import { AdminAnnouncementService } from '../../../services/admin-announcement.service';

@Component({
  selector: 'app-admin-announcement-detail',
  templateUrl: './admin-announcement-detail.component.html',
  styleUrls: ['../admin-shared.css', './admin-announcement-detail.component.css'],
})
export class AdminAnnouncementDetailComponent implements OnInit, OnDestroy {
  readonly arrowLeft: LucideIconData = ArrowLeft;
  readonly pencilIcon: LucideIconData = Pencil;
  readonly trashIcon: LucideIconData = Trash2;

  announcement: AdminAnnouncementRecord | null = null;
  form!: FormGroup;
  loading = true;
  editing = false;
  saving = false;
  error: string | null = null;
  actionError: string | null = null;
  successMessage: string | null = null;

  private subs = new Subscription();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly adminService: AdminAnnouncementService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title:    ['', Validators.required],
      subtitle: [''],
      body:     [''],
      cta:      [''],
      href:     [''],
      active:   [true],
    });

    this.subs.add(
      this.route.paramMap.subscribe((params) => {
        const id = Number(params.get('id'));
        if (!id) {
          this.router.navigate(['/admin/announcements']);
          return;
        }
        this.loadAnnouncement(id);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  loadAnnouncement(id: number): void {
    this.loading = true;
    this.error = null;
    this.editing = false;

    this.subs.add(
      this.adminService.getAnnouncement(id).subscribe({
        next: (record) => {
          this.announcement = record;
          this.form.patchValue({
            title:    record.title,
            subtitle: record.subtitle ?? '',
            body:     record.body ?? '',
            cta:      record.cta ?? '',
            href:     record.href ?? '',
            active:   record.active,
          });
          this.loading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;
          this.error = err.error?.message ?? 'Announcement not found.';
        },
      }),
    );
  }

  startEditing(): void {
    this.editing = true;
    this.actionError = null;
    this.successMessage = null;
  }

  cancelEditing(): void {
    if (!this.announcement) return;
    this.editing = false;
    this.form.patchValue({
      title:    this.announcement.title,
      subtitle: this.announcement.subtitle ?? '',
      body:     this.announcement.body ?? '',
      cta:      this.announcement.cta ?? '',
      href:     this.announcement.href ?? '',
      active:   this.announcement.active,
    });
  }

  saveChanges(): void {
    if (!this.announcement || this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.actionError = null;
    this.successMessage = null;
    const payload = this.form.value as AnnouncementPayload;

    this.subs.add(
      this.adminService.updateAnnouncement(this.announcement.id, payload).subscribe({
        next: (updated) => {
          this.announcement = updated;
          this.editing = false;
          this.saving = false;
          this.successMessage = 'Announcement updated.';
        },
        error: (err: HttpErrorResponse) => {
          this.saving = false;
          this.actionError = err.error?.message ?? 'Could not save changes.';
        },
      }),
    );
  }

  deleteAnnouncement(): void {
    if (!this.announcement) return;

    const confirmed = window.confirm(`Delete "${this.announcement.title}"?`);
    if (!confirmed) return;

    this.subs.add(
      this.adminService.deleteAnnouncement(this.announcement.id).subscribe({
        next: () => this.router.navigate(['/admin/announcements']),
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
