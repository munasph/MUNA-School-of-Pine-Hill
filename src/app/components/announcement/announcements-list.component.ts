import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { AnnouncementService } from '../../services/announcement.service';
import type { Announcement } from '../../models/announcement.model';
import { HOME_COPY } from '../home/home.data';

@Component({
  selector: 'app-announcements-list-page',
  templateUrl: './announcements-list.component.html',
  styleUrls: ['./announcements-list.component.css'],
})
export class AnnouncementsListComponent implements OnInit, OnDestroy {
  readonly campaign = HOME_COPY.campaign;
  announcements: Announcement[] = [];
  loading = true;

  private subs = new Subscription();

  constructor(
    private readonly seo: SeoService,
    private readonly announcementService: AnnouncementService,
  ) {}

  ngOnInit(): void {
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
