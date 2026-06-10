import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';

import type { Announcement } from '../../models/announcement.model';
import { AnnouncementService } from '../../services/announcement.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-announcement-detail',
  templateUrl: './announcement-detail.component.html',
  styleUrls: ['./announcement-detail.component.css'],
})
export class AnnouncementDetailComponent implements OnInit, OnDestroy {
  announcement: Announcement | null = null;
  loading = true;
  error: string | null = null;

  private subs = new Subscription();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly announcementService: AnnouncementService,
    private readonly seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.route.paramMap.pipe(
        switchMap((params) => {
          const id = Number(params.get('id'));
          this.loading = true;
          this.error = null;
          return this.announcementService.getAnnouncement(id);
        }),
      ).subscribe({
        next: (item) => {
          this.announcement = item;
          this.loading = false;
          this.seo.update({
            title:       item.title,
            description: item.subtitle || item.title,
            path:        `/announcements/${item.id}`,
          });
        },
        error: (err: HttpErrorResponse) => {
          this.loading = false;
          this.error = err.status === 404
            ? 'This announcement is not available.'
            : (err.error?.message ?? 'Could not load announcement.');
        },
      }),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  formatDate(value: string): string {
    return new Date(value).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  }

  bodyParagraphs(body?: string): string[] {
    if (!body?.trim()) return [];
    const parts = body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
    return parts.length ? parts : [body.trim()];
  }

  isInternalLink(path: string): boolean {
    return path.startsWith('/');
  }

  relatedLinkLabel(item: Announcement): string {
    return item.cta?.trim() || 'Related link';
  }

  relatedLinkHref(item: Announcement): string {
    return item.href?.trim() || '';
  }
}
