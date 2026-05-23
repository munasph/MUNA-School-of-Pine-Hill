import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  MapPin, Phone, Mail, Calendar,
  Facebook, Youtube, Instagram, ChevronRight,
  LucideIconData,
} from 'lucide-angular';
import { SCHOOL_INFO, QUICK_LINKS, PROGRAMS_LIST, SOCIAL_LINKS } from '../../data/site';
import { TranslationService } from '../../services/translation.service';
import type { Translations } from '../../translations/en';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit, OnDestroy {
  readonly schoolInfo  = SCHOOL_INFO;
  readonly quickLinks  = QUICK_LINKS;
  readonly programs    = PROGRAMS_LIST;

  readonly mapPin:        LucideIconData = MapPin;
  readonly phone:         LucideIconData = Phone;
  readonly mail:          LucideIconData = Mail;
  readonly calendar:      LucideIconData = Calendar;
  readonly chevronRight:  LucideIconData = ChevronRight;

  readonly socialIcons = [
    { icon: Facebook  as LucideIconData, label: 'Follow us on Facebook',  href: SOCIAL_LINKS[0].href },
    { icon: Youtube   as LucideIconData, label: 'Watch us on YouTube',     href: SOCIAL_LINKS[1].href },
    { icon: Instagram as LucideIconData, label: 'Follow us on Instagram',  href: SOCIAL_LINKS[2].href },
  ];

  t!: Translations;
  private sub?: Subscription;

  constructor(private readonly translation: TranslationService) {}

  ngOnInit(): void {
    this.t = this.translation.t;
    this.sub = this.translation.t$.subscribe((v) => (this.t = v));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  quickLinkLabel(label: string, path: string): string {
    return path === '/admission' ? this.t.footer.admission : label;
  }
}
