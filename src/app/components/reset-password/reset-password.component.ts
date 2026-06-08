import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { SeoService } from '../../services/seo.service';
import { fieldError } from '../../utils/form-validation';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  token = '';
  submitting = false;
  submitted = false;
  submitError: string | null = null;

  private subs = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';
    this.seo.update({ title: 'Reset Password', description: 'Reset your admin password.', path: '/reset-password' });
    this.form = this.fb.group({
      password:        ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void { this.subs.unsubscribe(); }

  errorFor(field: 'password' | 'confirmPassword'): string | null {
    const labels = { password: 'Password', confirmPassword: 'Confirm password' };
    if (field === 'confirmPassword' && this.form.touched
        && this.form.value.password !== this.form.value.confirmPassword) {
      return 'Passwords do not match';
    }
    return fieldError(this.form.get(field), labels[field]);
  }

  submit(): void {
    if (!this.token) { this.submitError = 'Invalid reset link.'; return; }
    if (this.form.invalid || this.form.value.password !== this.form.value.confirmPassword) {
      this.form.markAllAsTouched(); return;
    }
    this.submitting = true;
    this.submitError = null;
    this.subs.add(
      this.authService.confirmPasswordReset({
        token: this.token,
        password: this.form.value.password,
        confirmPassword: this.form.value.confirmPassword,
      }).subscribe({
        next: () => {
          this.submitted = true;
          this.submitting = false;
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (err: HttpErrorResponse) => {
          this.submitting = false;
          this.submitError = err.error?.message ?? 'Could not reset password.';
        },
      }),
    );
  }
}
