import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CheckCircle, LucideIconData } from 'lucide-angular';

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
  readonly checkCircle: LucideIconData = CheckCircle;
  readonly t = LOGIN_COPY;

  form!: FormGroup;
  submitted = false;
  submitting = false;
  successMessage = '';

  private subs = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.seo.update({
      title:       'Log In',
      description: 'Sign in to your account.',
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
    const payload = this.form.value as LoginCredentials;

    this.subs.add(
      this.authService.login(payload).subscribe({
        next: (res) => {
          this.submitted = true;
          this.successMessage = res.message;
          this.submitting = false;
        },
        error: () => {
          this.submitting = false;
        },
      }),
    );
  }
}
