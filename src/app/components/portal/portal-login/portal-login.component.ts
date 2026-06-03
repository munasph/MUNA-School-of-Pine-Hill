import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import type { PortalLoginCredentials } from '../../../models/portal-auth.model';
import { PortalAuthService } from '../../../services/portal-auth.service';
import { SeoService } from '../../../services/seo.service';
import { EMAIL_PATTERN, fieldError } from '../../../utils/form-validation';
import { PORTAL_COPY } from '../portal.data';

@Component({
  selector: 'app-portal-login',
  templateUrl: './portal-login.component.html',
  styleUrls: ['./portal-login.component.css'],
})
export class PortalLoginComponent implements OnInit, OnDestroy {
  readonly t = PORTAL_COPY.login;

  form!: FormGroup;
  submitting = false;

  private subs = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly portal: PortalAuthService,
    private readonly seo: SeoService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if (this.portal.isAuthenticated()) {
      this.router.navigate(['/portal']);
      return;
    }

    this.seo.update({
      title:       'Family portal — Log in',
      description: 'Log in to the family portal.',
      path:        '/portal/login',
    });

    this.form = this.fb.group({
      email:    ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  errorFor(field: 'email' | 'password'): string | null {
    return fieldError(this.form.get(field), field === 'email' ? 'Email' : 'Password');
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const payload = this.form.value as PortalLoginCredentials;

    this.subs.add(
      this.portal.login(payload).subscribe({
        next: () => {
          this.submitting = false;
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/portal';
          this.router.navigateByUrl(returnUrl);
        },
        error: () => {
          this.submitting = false;
        },
      }),
    );
  }
}
