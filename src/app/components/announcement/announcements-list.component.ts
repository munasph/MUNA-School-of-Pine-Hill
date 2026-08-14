import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { AnnouncementService } from '../../services/announcement.service';
import { SchoolInfoService, type SchoolInfo } from '../../services/school-info.service';
import type { Announcement } from '../../models/announcement.model';
import { HOME_COPY } from '../home/home.data';

@Component({
  selector: 'app-announcements-list-page',
  templateUrl: './announcements-list.component.html',
  styleUrls: ['./announcements-list.component.css'],
})
export class AnnouncementsListComponent implements OnInit, OnDestroy {
  readonly campaign = HOME_COPY.campaign;
  schoolInfo!: SchoolInfo;
  announcements: Announcement[] = [];
  loading = true;

  private subs = new Subscription();

  constructor(
    private readonly seo: SeoService,
    private readonly announcementService: AnnouncementService,
    private readonly schoolInfoService: SchoolInfoService,
  ) {
    this.schoolInfo = this.schoolInfoService.snapshot;
  }

  ngOnInit(): void {
    this.subs.add(this.schoolInfoService.schoolInfo$.subscribe((info) => (this.schoolInfo = info)));

    this.seo.update({
      title:       'Announcements',
      description: 'School announcements and Pre-K & Kindergarten open house details for MUNA School of Pine Hill.',
      path:        '/announcements',
    });

    this.subs.add(
      this.announcementService.getActiveAnnouncements(20).subscribe({
        next: (items) => {
          this.announcements = items;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      }),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
