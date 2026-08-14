import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  ClipboardList, Award, BookOpen, HelpCircle, Megaphone, X, LucideIconData,
} from 'lucide-angular';

import type { Announcement } from '../../models/announcement.model';
import { AnnouncementService } from '../../services/announcement.service';
import { SchoolInfoService, type SchoolInfo } from '../../services/school-info.service';
import { HOME_COPY } from './home.data';
import { SeoService } from '../../services/seo.service';

interface QuickLink {
  label: string;
  desc:  string;
  path:  string;
  icon:  LucideIconData;
  soon?: boolean;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  schoolInfo!: SchoolInfo;
  announcements: Announcement[] = [];
  announcementLoading = true;
  campaignOpen = false;

  readonly t = HOME_COPY;
  readonly megaphone: LucideIconData = Megaphone;
  readonly closeIcon: LucideIconData = X;
  readonly quickLinks: QuickLink[] = [
    { label: HOME_COPY.quickLinks.registration.label, desc: HOME_COPY.quickLinks.registration.desc, path: HOME_COPY.quickLinks.registration.path, icon: ClipboardList },
    { label: HOME_COPY.quickLinks.faq.label,           desc: HOME_COPY.quickLinks.faq.desc,           path: HOME_COPY.quickLinks.faq.path,           icon: HelpCircle },
    { label: HOME_COPY.quickLinks.handbook.label,     desc: HOME_COPY.quickLinks.handbook.desc,     path: HOME_COPY.quickLinks.handbook.path,     icon: BookOpen, soon: true },
    { label: HOME_COPY.quickLinks.policy.label,       desc: HOME_COPY.quickLinks.policy.desc,       path: HOME_COPY.quickLinks.policy.path,       icon: Award },
  ];

  scrollY = 0;
  private subs = new Subscription();
  private openTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private readonly announcementService: AnnouncementService,
    private readonly seo: SeoService,
    private readonly schoolInfoService: SchoolInfoService,
  ) {}

  ngOnInit(): void {
    this.schoolInfo = this.schoolInfoService.snapshot;
    this.subs.add(this.schoolInfoService.schoolInfo$.subscribe((info) => (this.schoolInfo = info)));

    this.subs.add(
      this.announcementService.getActiveAnnouncements(3).subscribe({
        next: (items) => {
          this.announcements = items;
          this.announcementLoading = false;
        },
        error: () => {
          this.announcementLoading = false;
        },
      }),
    );

    this.seo.update({
      title:       this.schoolInfoService.snapshot.name,
      description: 'A faith-centered K–12 Islamic school in South Jersey offering quality education rooted in Islamic values and academic excellence.',
      path:        '/',
    });

    this.scheduleCampaignModal();
  }

  ngOnDestroy(): void {
    if (this.openTimer) {
      clearTimeout(this.openTimer);
      this.openTimer = null;
    }
    this.unlockBodyScroll();
    this.subs.unsubscribe();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrollY = window.scrollY;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.campaignOpen) {
      this.dismissCampaign();
    }
  }

  parallaxStyle(): Record<string, string> {
    return { transform: `translateY(${this.scrollY * 0.4}px)` };
  }

  openCampaign(): void {
    this.campaignOpen = true;
    document.body.style.overflow = 'hidden';
  }

  dismissCampaign(): void {
    this.campaignOpen = false;
    this.unlockBodyScroll();
    try {
      sessionStorage.setItem(this.t.campaign.storageKey, '1');
    } catch {
      // Ignore storage failures in private browsing.
    }
  }

  private scheduleCampaignModal(): void {
    if (!this.t.campaign.enabled) return;

    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(this.t.campaign.storageKey) === '1';
    } catch {
      dismissed = false;
    }
    if (dismissed) return;

    this.openTimer = setTimeout(() => this.openCampaign(), 700);
  }

  private unlockBodyScroll(): void {
    document.body.style.overflow = '';
  }
}
