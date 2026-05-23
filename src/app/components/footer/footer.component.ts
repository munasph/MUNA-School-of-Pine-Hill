import { Component } from '@angular/core';
import {
  MapPin, Phone, Mail, Calendar,
  Facebook, Youtube, Instagram, ChevronRight,
  LucideIconData,
} from 'lucide-angular';
import {
  SCHOOL_INFO, QUICK_LINKS, PROGRAMS_LIST, SOCIAL_LINKS, FOOTER_COPY,
} from './site.data';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  readonly schoolInfo = SCHOOL_INFO;
  readonly quickLinks = QUICK_LINKS;
  readonly programs   = PROGRAMS_LIST;
  readonly t          = FOOTER_COPY;

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
