import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { CheckCircle, LucideIconData } from 'lucide-angular';

import type { SignupPayload } from '../../models/auth.model';
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
  successMessage = '';

  private subs = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.seo.update({
      title:       'Sign Up',
      description: 'Create a new account.',
      path:        '/signup',
    });

    this.form = this.fb.group({
      fullName:        ['', [Validators.required]],
      email:           ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      password:        ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: passwordsMatch });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  errorFor(field: 'fullName' | 'email' | 'password' | 'confirmPassword'): string | null {
    const control = this.form.get(field);
    const labels = {
      fullName:        'Full name',
      email:           'Email',
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
    const payload = this.form.value as SignupPayload;

    this.subs.add(
      this.authService.signup(payload).subscribe({
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
