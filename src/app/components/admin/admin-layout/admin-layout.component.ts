import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ClipboardList, ExternalLink, LayoutGrid, LogOut, Mail, Megaphone, Settings } from 'lucide-angular';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent {
  readonly clipboardList = ClipboardList;
  readonly megaphone = Megaphone;
  readonly mail = Mail;
  readonly settings = Settings;
  readonly hub = LayoutGrid;
  readonly externalLink = ExternalLink;
  readonly logOut = LogOut;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
  ) {}

  get adminEmail(): string {
    return this.auth.getSession()?.email ?? 'Admin';
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
