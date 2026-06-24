import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PortalAuthService } from '../../../services/portal-auth.service';
import { SeoService } from '../../../services/seo.service';
import { PORTAL_COPY } from '../portal.data';

type MagicState = 'verifying' | 'error';

@Component({
  selector: 'app-portal-magic-link',
  templateUrl: './portal-magic-link.component.html',
  styleUrls: ['../portal-login/portal-login.component.css'],
})
export class PortalMagicLinkComponent implements OnInit, OnDestroy {
  readonly t = PORTAL_COPY.magicLink;

  state: MagicState = 'verifying';
  message = '';

  private subs = new Subscription();

  constructor(
    private readonly portal: PortalAuthService,
    private readonly seo: SeoService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.seo.update({
      title:       'Family portal — Signing in',
      description: 'Completing your passwordless login.',
      path:        '/portal/magic-link',
    });

    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      this.fail(this.t.error);
      return;
    }

    this.subs.add(
      this.portal.consumeMagicLink(token).subscribe({
        next: (session) => {
          if (session) {
            this.router.navigateByUrl('/portal');
          } else {
            this.fail(this.t.error);
          }
        },
        error: (err) => {
          this.fail(err.error?.message ?? this.t.error);
        },
      }),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private fail(message: string): void {
    this.state = 'error';
    this.message = message;
  }
}
