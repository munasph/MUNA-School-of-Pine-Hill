import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { PortalAuthService } from '../../../services/portal-auth.service';
import { SeoService } from '../../../services/seo.service';
import { PORTAL_COPY } from '../portal.data';

type VerifyState = 'verifying' | 'success' | 'error';

@Component({
  selector: 'app-portal-verify-email',
  templateUrl: './portal-verify-email.component.html',
  styleUrls: ['../portal-login/portal-login.component.css'],
})
export class PortalVerifyEmailComponent implements OnInit, OnDestroy {
  readonly t = PORTAL_COPY.verify;

  state: VerifyState = 'verifying';
  message = '';

  private subs = new Subscription();

  constructor(
    private readonly portal: PortalAuthService,
    private readonly seo: SeoService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.seo.update({
      title:       'Family portal — Verify email',
      description: 'Verify your family portal email address.',
      path:        '/portal/verify-email',
    });

    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      this.state = 'error';
      this.message = 'This verification link is invalid.';
      return;
    }

    this.subs.add(
      this.portal.verifyEmail(token).subscribe({
        next: (res) => {
          this.state = 'success';
          this.message = res.message;
        },
        error: (err) => {
          this.state = 'error';
          this.message = err.error?.message ?? 'This verification link is invalid or has expired.';
        },
      }),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
