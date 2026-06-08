import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { SeoService } from '../../services/seo.service';
import { EMAIL_PATTERN, fieldError } from '../../utils/form-validation';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  submitting = false;
  submitted = false;
  submitError: string | null = null;
  successMessage = '';

  private subs = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.seo.update({ title: 'Forgot Password', description: 'Reset your admin password.', path: '/forgot-password' });
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
    });
  }

  ngOnDestroy(): void { this.subs.unsubscribe(); }

  errorFor(field: 'email'): string | null {
    return fieldError(this.form.get(field), 'Email');
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitting = true;
    this.submitError = null;
    this.subs.add(
      this.authService.requestPasswordReset({ email: this.form.value.email }).subscribe({
        next: (res) => {
          this.submitted = true;
          this.successMessage = res.message;
          this.submitting = false;
        },
        error: (err: HttpErrorResponse) => {
          this.submitting = false;
          this.submitError = err.error?.message ?? 'Could not send reset email.';
        },
      }),
    );
  }
}
