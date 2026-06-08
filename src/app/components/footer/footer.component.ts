import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { PortalAuthService } from '../../services/portal-auth.service';
import {
  MapPin, Phone, Mail, Calendar,
  Facebook, Youtube, Instagram, ChevronRight,
  LucideIconData,
} from 'lucide-angular';
import {
  QUICK_LINKS, PROGRAMS_LIST, SOCIAL_LINKS, FOOTER_COPY,
} from './site.data';
import { SchoolInfoService, type SchoolInfo } from '../../services/school-info.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit, OnDestroy {
  schoolInfo: SchoolInfo;
  readonly quickLinks = QUICK_LINKS;
  readonly programs   = PROGRAMS_LIST;
  readonly t          = FOOTER_COPY;

  familyLink = { path: '/portal', label: 'Family portal' };
  staffLink = { path: '/login', label: 'Staff login' };

  private subs = new Subscription();

  constructor(
    private readonly auth: AuthService,
    private readonly portalAuth: PortalAuthService,
    private readonly schoolInfoService: SchoolInfoService,
  ) {
    this.schoolInfo = schoolInfoService.snapshot;
  }

  ngOnInit(): void {
    this.subs.add(this.schoolInfoService.schoolInfo$.subscribe((info) => (this.schoolInfo = info)));
    this.updateAuthLinks();
    this.subs.add(this.auth.session$.subscribe(() => this.updateAuthLinks()));
    this.subs.add(this.portalAuth.session$.subscribe(() => this.updateAuthLinks()));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private updateAuthLinks(): void {
    if (this.portalAuth.isAuthenticated()) {
      this.familyLink = { path: '/portal', label: 'My portal' };
    } else {
      this.familyLink = { path: '/portal', label: 'Family portal' };
    }

    if (this.auth.isAuthenticated() && this.auth.isAdmin()) {
      this.staffLink = { path: '/admin', label: 'Admin dashboard' };
    } else {
      this.staffLink = { path: '/login', label: 'Staff login' };
    }
  }

  readonly mapPin:       LucideIconData = MapPin;
  readonly phone:        LucideIconData = Phone;
  readonly mail:         LucideIconData = Mail;
  readonly calendar:     LucideIconData = Calendar;
  readonly chevronRight: LucideIconData = ChevronRight;

  readonly socialIcons = [
    { icon: Facebook  as LucideIconData, label: 'Follow us on Facebook',  href: SOCIAL_LINKS[0].href },
    { icon: Youtube   as LucideIconData, label: 'Watch us on YouTube',     href: SOCIAL_LINKS[1].href },
    { icon: Instagram as LucideIconData, label: 'Follow us on Instagram',  href: SOCIAL_LINKS[2].href },
  ];

  quickLinkLabel(label: string, path: string): string {
    return path === '/admission' ? this.t.footer.admission : label;
  }
}
