import { Component, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CheckCircle, CircleAlert, ClipboardList, ExternalLink, LayoutGrid, LogOut, Mail, Megaphone, Settings, Users, X } from 'lucide-angular';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../services/auth.service';
import { AdminFeedbackService, type AdminFeedback } from '../../../services/admin-feedback.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent implements OnDestroy {
  readonly clipboardList = ClipboardList;
  readonly megaphone = Megaphone;
  readonly mail = Mail;
  readonly settings = Settings;
  readonly users = Users;
  readonly hub = LayoutGrid;
  readonly externalLink = ExternalLink;
  readonly logOut = LogOut;
  readonly checkCircle = CheckCircle;
  readonly circleAlert = CircleAlert;
  readonly closeIcon = X;

  feedback: AdminFeedback | null = null;

  private subs = new Subscription();

  constructor(
    public readonly auth: AuthService,
    private readonly router: Router,
    private readonly feedbackService: AdminFeedbackService,
  ) {
    this.subs.add(
      this.feedbackService.feedback$.subscribe((feedback) => (this.feedback = feedback)),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  dismissFeedback(): void {
    this.feedbackService.dismiss();
  }

  get adminEmail(): string {
    return this.auth.getSession()?.email ?? 'Admin';
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
