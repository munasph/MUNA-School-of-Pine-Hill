import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { PortalAuthService } from '../../../services/portal-auth.service';
import { SeoService } from '../../../services/seo.service';
import { fieldError } from '../../../utils/form-validation';
import { PORTAL_COPY } from '../portal.data';

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm  = group.get('confirmPassword')?.value;
  return password === confirm ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-portal-reset-password',
  templateUrl: './portal-reset-password.component.html',
  styleUrls: ['../portal-login/portal-login.component.css'],
})
export class PortalResetPasswordComponent implements OnInit, OnDestroy {
  readonly t = PORTAL_COPY.reset;

  form!: FormGroup;
  submitting = false;
  done = false;
  errorMessage: string | null = null;

  private token = '';
  private subs = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly portal: PortalAuthService,
    private readonly seo: SeoService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.seo.update({
      title:       'Family portal — New password',
      description: 'Choose a new password.',
      path:        '/portal/reset-password',
    });

    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';
    if (!this.token) {
      this.errorMessage = 'This reset link is invalid.';
    }

    this.form = this.fb.group({
      password:        ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: passwordsMatch });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  errorFor(field: 'password' | 'confirmPassword'): string | null {
    const control = this.form.get(field);
    if (field === 'confirmPassword' && control?.touched && this.form.errors?.['passwordMismatch']) {
      return 'Passwords do not match';
    }
    return fieldError(control, field === 'password' ? 'Password' : 'Confirm password');
  }

  submit(): void {
    if (this.form.invalid || !this.token) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.errorMessage = null;
    const { password, confirmPassword } = this.form.value;

    this.subs.add(
      this.portal.resetPassword(this.token, password, confirmPassword).subscribe({
        next: () => {
          this.submitting = false;
          this.done = true;
        },
        error: (err) => {
          this.submitting = false;
          this.errorMessage = err.error?.message ?? 'Unable to reset password. Request a new link.';
        },
      }),
    );
  }
}
