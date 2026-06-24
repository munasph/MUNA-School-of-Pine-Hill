import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { PortalAuthService } from '../../../services/portal-auth.service';
import { SeoService } from '../../../services/seo.service';
import { EMAIL_PATTERN, fieldError } from '../../../utils/form-validation';
import { PORTAL_COPY } from '../portal.data';

@Component({
  selector: 'app-portal-forgot-password',
  templateUrl: './portal-forgot-password.component.html',
  styleUrls: ['../portal-login/portal-login.component.css'],
})
export class PortalForgotPasswordComponent implements OnInit, OnDestroy {
  readonly t = PORTAL_COPY.forgot;

  form!: FormGroup;
  submitting = false;
  message: string | null = null;

  private subs = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly portal: PortalAuthService,
    private readonly seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.seo.update({
      title:       'Family portal — Reset password',
      description: 'Request a password reset link.',
      path:        '/portal/forgot-password',
    });

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  errorFor(field: 'email'): string | null {
    return fieldError(this.form.get(field), 'Email');
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.subs.add(
      this.portal.forgotPassword(this.form.value.email).subscribe({
        next: (res) => {
          this.submitting = false;
          this.message = res.message;
        },
        error: (err) => {
          this.submitting = false;
          this.message = err.error?.message ?? 'Something went wrong. Please try again.';
        },
      }),
    );
  }
}
