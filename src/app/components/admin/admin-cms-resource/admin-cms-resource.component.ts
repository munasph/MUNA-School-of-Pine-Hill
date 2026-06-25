import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArrowLeft, LucideIconData, Plus, RefreshCw, Trash2 } from 'lucide-angular';

import {
  CMS_PUBLISH_LABELS, CMS_PUBLISH_STATUSES, findCmsModule,
} from '../../../config/cms-admin.config';
import type { CmsAdminModuleConfig, CmsPublishStatus } from '../../../config/cms-admin.config';
import type { CmsRecord } from '../../../models/cms-features.model';
import { AdminCmsApiService } from '../../../services/admin-cms-api.service';
import { AdminFeedbackService } from '../../../services/admin-feedback.service';

@Component({
  selector: 'app-admin-cms-resource',
  templateUrl: './admin-cms-resource.component.html',
  styleUrls: ['../admin-shared.css', './admin-cms-resource.component.css'],
})
export class AdminCmsResourceComponent implements OnInit, OnDestroy {
  readonly arrowLeft = ArrowLeft;
  readonly refreshIcon: LucideIconData = RefreshCw;
  readonly plusIcon: LucideIconData = Plus;
  readonly trashIcon: LucideIconData = Trash2;
  readonly publishStatuses = CMS_PUBLISH_STATUSES;
  readonly publishLabels = CMS_PUBLISH_LABELS;

  config: CmsAdminModuleConfig | null = null;
  items: CmsRecord[] = [];
  loading = false;
  error: string | null = null;
  actionError: string | null = null;

  showEditor = false;
  editingId: number | null = null;
  editorForm!: FormGroup;
  editorJson = '';
  saving = false;

  private subs = new Subscription();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly cmsApi: AdminCmsApiService,
    private readonly feedback: AdminFeedbackService,
  ) {}

  ngOnInit(): void {
    this.editorForm = this.fb.group({});

    this.subs.add(
      this.route.paramMap.subscribe((params) => {
        const key = params.get('resource') ?? '';
        this.config = findCmsModule(key) ?? null;
        if (!this.config) {
          this.router.navigate(['/admin/hub']);
          return;
        }
        this.loadList();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  loadList(): void {
    if (!this.config) return;
    this.loading = true;
    this.error = null;

    if (this.config.route === 'audit-logs') {
      this.subs.add(
        this.cmsApi.listAuditLogs().subscribe({
          next: (rows) => {
            this.items = rows as unknown as CmsRecord[];
            this.loading = false;
          },
          error: (err: HttpErrorResponse) => this.onLoadError(err),
        }),
      );
      return;
    }

    if (this.config.route === 'notifications' || this.config.route === 'analytics') {
      this.loading = false;
      this.items = [];
      return;
    }

    this.subs.add(
      this.cmsApi.list(this.config).subscribe({
        next: (rows) => {
          this.items = rows;
          this.loading = false;
        },
        error: (err: HttpErrorResponse) => this.onLoadError(err),
      }),
    );
  }

  private onLoadError(err: HttpErrorResponse): void {
    this.loading = false;
    this.error = err.error?.message ?? 'Could not load records.';
  }

  displayTitle(item: CmsRecord): string {
    if (!this.config?.titleField) return String(item['id'] ?? '');
    const v = item[this.config.titleField];
    return v != null ? String(v) : '(untitled)';
  }

  openCreate(): void {
    this.editingId = null;
    this.editorJson = this.defaultJson();
    this.showEditor = true;
    this.actionError = null;
  }

  openEdit(item: CmsRecord): void {
    this.editingId = Number(item['id']);
    const clone = { ...item };
    delete clone['id'];
    delete clone['createdAt'];
    delete clone['updatedAt'];
    this.editorJson = JSON.stringify(clone, null, 2);
    this.showEditor = true;
    this.actionError = null;
  }

  cancelEditor(): void {
    this.showEditor = false;
    this.editingId = null;
  }

  saveEditor(): void {
    if (!this.config) return;
    let payload: CmsRecord;
    try {
      payload = JSON.parse(this.editorJson) as CmsRecord;
    } catch {
      this.feedback.showError('Fix the JSON syntax before saving.', 'Invalid JSON');
      return;
    }

    this.saving = true;
    this.actionError = null;

    const req = this.editingId == null
      ? this.cmsApi.create(this.config, payload)
      : this.cmsApi.update(this.config, this.editingId, payload);

    this.subs.add(
      req.subscribe({
        next: () => {
          this.saving = false;
          this.showEditor = false;
          this.loadList();
          this.feedback.showSuccess(
            this.editingId == null ? 'The new record is now saved.' : 'Your changes have been saved.',
            'Record saved',
          );
        },
        error: (err: HttpErrorResponse) => {
          this.saving = false;
          this.feedback.showError(err.error?.message ?? 'Could not save.', 'Save failed');
        },
      }),
    );
  }

  deleteItem(item: CmsRecord): void {
    if (!this.config || item['id'] == null) return;
    if (!window.confirm('Delete this record?')) return;

    this.subs.add(
      this.cmsApi.delete(this.config, Number(item['id'])).subscribe({
        next: () => this.loadList(),
        error: (err: HttpErrorResponse) => {
          this.actionError = err.error?.message ?? 'Could not delete.';
        },
      }),
    );
  }

  private defaultJson(): string {
    if (!this.config) return '{}';
    const base: CmsRecord = {};
    if (this.config.statusField) {
      base[this.config.statusField] = 'DRAFT' as CmsPublishStatus;
    }
    if (this.config.titleField === 'title') base['title'] = '';
    if (this.config.titleField === 'name') base['name'] = '';
    if (this.config.titleField === 'question') {
      base['question'] = '';
      base['answer'] = '';
    }
    if (this.config.route === 'events') {
      base['startAt'] = new Date().toISOString();
      base['allDay'] = false;
    }
    if (this.config.route === 'news') {
      base['slug'] = 'new-post';
      base['title'] = '';
    }
    return JSON.stringify(base, null, 2);
  }
}
