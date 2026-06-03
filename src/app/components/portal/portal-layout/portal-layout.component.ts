import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ExternalLink, GraduationCap, LayoutDashboard, LogOut, MessageSquare } from 'lucide-angular';

import { PortalAuthService } from '../../../services/portal-auth.service';

@Component({
  selector: 'app-portal-layout',
  templateUrl: './portal-layout.component.html',
  styleUrls: ['./portal-layout.component.css'],
})
export class PortalLayoutComponent {
  readonly dashboard = LayoutDashboard;
  readonly grades = GraduationCap;
  readonly messages = MessageSquare;
  readonly externalLink = ExternalLink;
  readonly logOut = LogOut;

  constructor(
    private readonly portal: PortalAuthService,
    private readonly router: Router,
  ) {}

  get session() {
    return this.portal.getSession();
  }

  logout(): void {
    this.portal.logout();
    this.router.navigate(['/portal/login']);
  }
}
