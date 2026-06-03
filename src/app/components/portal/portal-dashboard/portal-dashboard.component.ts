import { Component } from '@angular/core';
import { LucideIconData, Lock } from 'lucide-angular';

import { PortalAuthService } from '../../../services/portal-auth.service';
import { PORTAL_COPY } from '../portal.data';

@Component({
  selector: 'app-portal-dashboard',
  templateUrl: './portal-dashboard.component.html',
  styleUrls: ['./portal-dashboard.component.css'],
})
export class PortalDashboardComponent {
  readonly lockIcon: LucideIconData = Lock;
  readonly t = PORTAL_COPY.dashboard;

  readonly cards = [
    { key: 'grades', ...PORTAL_COPY.dashboard.cards.grades },
    { key: 'attendance', ...PORTAL_COPY.dashboard.cards.attendance },
    { key: 'messages', ...PORTAL_COPY.dashboard.cards.messages },
    { key: 'fees', ...PORTAL_COPY.dashboard.cards.fees },
  ];

  constructor(private readonly portal: PortalAuthService) {}

  get session() {
    return this.portal.getSession();
  }
}
