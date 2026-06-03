import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CheckCircle, LucideIconData } from 'lucide-angular';

import type { PortalRole, PortalSignupPayload } from '../../../models/portal-auth.model';
import { PortalAuthService } from '../../../services/portal-auth.service';
import { SeoService } from '../../../services/seo.service';
import { EMAIL_PATTERN, fieldError } from '../../../utils/form-validation';
import { PORTAL_COPY } from '../portal.data';

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm  = group.get('confirmPassword')?.value;
  return password === confirm ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-portal-signup',
  templateUrl: './portal-signup.component.html',
  styleUrls: ['../portal-login/portal-login.component.css', './portal-signup.component.css'],
})
export class PortalSignupComponent implements OnInit, OnDestroy {
  readonly checkCircle: LucideIconData = CheckCircle;
  readonly t = PORTAL_COPY.signup;

  form!: FormGroup;
  submitted = false;
  submitting = false;

  private subs = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly portal: PortalAuthService,
    private readonly seo: SeoService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    if (this.portal.isAuthenticated()) {
      this.router.navigate(['/portal']);
      return;
    }

    this.seo.update({
      title:       'Family portal — Sign up',
      description: 'Create a family portal account.',
      path:        '/portal/signup',
    });

    this.form = this.fb.group({
      fullName:        ['', [Validators.required]],
      email:           ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      password:        ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      role:            ['PARENT' as PortalRole, Validators.required],
    }, { validators: passwordsMatch });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  errorFor(field: 'fullName' | 'email' | 'password' | 'confirmPassword'): string | null {
    const control = this.form.get(field);
    const labels = {
      fullName: 'Full name', email: 'Email',
      password: 'Password', confirmPassword: 'Confirm password',
    };

    if (field === 'confirmPassword' && control?.touched) {
      if (control.errors?.['required']) return 'Confirm password is required';
      if (this.form.errors?.['passwordMismatch']) return 'Passwords do not match';
    }

    return fieldError(control, labels[field]);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const payload = this.form.value as PortalSignupPayload;

    this.subs.add(
      this.portal.signup(payload).subscribe({
        next: () => {
          this.submitted = true;
          this.submitting = false;
          setTimeout(() => this.router.navigate(['/portal']), 1500);
        },
        error: () => {
          this.submitting = false;
        },
      }),
    );
  }
}
