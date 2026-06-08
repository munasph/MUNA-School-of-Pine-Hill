import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { CheckCircle, LucideIconData } from 'lucide-angular';

import type { StaffSignupPayload } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';
import { SeoService } from '../../services/seo.service';
import { EMAIL_PATTERN, fieldError } from '../../utils/form-validation';
import { SIGNUP_COPY } from './signup.data';

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm  = group.get('confirmPassword')?.value;
  return password === confirm ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  readonly checkCircle: LucideIconData = CheckCircle;
  readonly t = SIGNUP_COPY;

  form!: FormGroup;
  submitted = false;
  submitting = false;
  submitError: string | null = null;
  successMessage = '';
  readonly roleOptions = [
    { value: 'EDITOR', label: 'Editor' },
    { value: 'ADMIN', label: 'Admin' },
  ];

  private subs = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.seo.update({
      title:       'Request Staff Access',
      description: 'Request access to the MUNA School admin portal.',
      path:        '/staff-signup',
    });

    this.form = this.fb.group({
      fullName:        ['', [Validators.required]],
      email:           ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      role:            ['EDITOR', [Validators.required]],
      password:        ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: passwordsMatch });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  errorFor(field: 'fullName' | 'email' | 'role' | 'password' | 'confirmPassword'): string | null {
    const control = this.form.get(field);
    const labels = {
      fullName:        'Full name',
      email:           'Email',
      role:            'Role',
      password:        'Password',
      confirmPassword: 'Confirm password',
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
    this.submitError = null;
    const payload = this.form.value as StaffSignupPayload;

    this.subs.add(
      this.authService.staffSignup(payload).subscribe({
        next: (res) => {
          this.submitted = true;
          this.successMessage = res.message;
          this.submitting = false;
        },
        error: (err: HttpErrorResponse) => {
          this.submitting = false;
          this.submitError = err.error?.message ?? 'Could not submit request.';
        },
      }),
    );
  }
}
