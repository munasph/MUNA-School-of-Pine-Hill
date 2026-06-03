import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import type { LoginCredentials } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';
import { SeoService } from '../../services/seo.service';
import { EMAIL_PATTERN, fieldError } from '../../utils/form-validation';
import { LOGIN_COPY } from './login.data';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  readonly t = LOGIN_COPY;

  form!: FormGroup;
  submitting = false;
  submitError: string | null = null;

  private subs = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly seo: SeoService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/admin/admissions']);
      return;
    }

    this.seo.update({
      title:       'Log In',
      description: 'Sign in to the school admin area.',
      path:        '/login',
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
    const labels = { email: 'Email', password: 'Password' };
    return fieldError(this.form.get(field), labels[field]);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.submitError = null;
    const payload = this.form.value as LoginCredentials;

    this.subs.add(
      this.authService.login(payload).subscribe({
        next: () => {
          this.submitting = false;
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/admin/admissions';
          this.router.navigateByUrl(returnUrl);
        },
        error: (err: HttpErrorResponse) => {
          this.submitting = false;
          this.submitError = err.error?.message ?? 'Invalid email or password.';
        },
      }),
    );
  }
}
