import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArrowLeft, LucideIconData } from 'lucide-angular';

import type { AnnouncementPayload } from '../../../models/admin.model';
import { AdminAnnouncementService } from '../../../services/admin-announcement.service';

@Component({
  selector: 'app-admin-announcement-form',
  templateUrl: './admin-announcement-form.component.html',
  styleUrls: ['../admin-shared.css', './admin-announcement-form.component.css'],
})
export class AdminAnnouncementFormComponent implements OnInit, OnDestroy {
  readonly arrowLeft: LucideIconData = ArrowLeft;

  form!: FormGroup;
  submitting = false;
  error: string | null = null;

  private subs = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly adminService: AdminAnnouncementService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      emoji:    ['🎓'],
      title:    ['', Validators.required],
      subtitle: [''],
      cta:      ['Learn More'],
      href:     ['/admission'],
      active:   [true],
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.error = null;
    const payload = this.form.value as AnnouncementPayload;

    this.subs.add(
      this.adminService.createAnnouncement(payload).subscribe({
        next: (created) => {
          this.submitting = false;
          this.router.navigate(['/admin/announcements', created.id]);
        },
        error: (err: HttpErrorResponse) => {
          this.submitting = false;
          this.error = err.error?.message ?? 'Could not create announcement.';
        },
      }),
    );
  }
}
