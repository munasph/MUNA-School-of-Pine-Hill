import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CheckCircle, LucideIconData } from 'lucide-angular';

import type {
  ClassOption, AdmissionApplication, AdmissionSuccessMessage,
} from '../../models/admission.model';
import { AdmissionService } from '../../services/admission.service';
import { SiteSettingsService } from '../../services/site-settings.service';
import { ADMISSION_COPY } from './admission.data';
import { SeoService } from '../../services/seo.service';
import { fieldError } from '../../utils/form-validation';

type AdmissionField =
  | 'fullName' | 'dob' | 'classApplying' | 'gender' | 'parentName' | 'parentPhone';

@Component({
  selector: 'app-admission-page',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css'],
})
export class AdmissionComponent implements OnInit, OnDestroy {
  admissionSuccess: AdmissionSuccessMessage = { title: '', message: '' };
  readonly checkCircle: LucideIconData = CheckCircle;
  readonly t = ADMISSION_COPY;

  classOptions: ClassOption[] = [];
  admissionsOpen = true;
  settingsLoading = true;

  form!: FormGroup;
  submitted = false;
  submitting = false;
  submitError: string | null = null;

  private subs = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly admissionService: AdmissionService,
    private readonly siteSettingsService: SiteSettingsService,
    private readonly seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.admissionService.getClassOptions().subscribe((opts) => (this.classOptions = opts)),
    );
    this.subs.add(
      this.admissionService.getSuccessMessage().subscribe((m) => (this.admissionSuccess = m)),
    );
    this.subs.add(
      this.siteSettingsService.getSettings().subscribe({
        next: (settings) => {
          this.admissionsOpen = settings.admissionsOpen;
          this.settingsLoading = false;
        },
        error: () => {
          this.admissionsOpen = true;
          this.settingsLoading = false;
        },
      }),
    );

    this.seo.update({
      title:       'Admission',
      description: 'Apply for admission. Form placeholder — connect to your backend when ready.',
      path:        '/admission',
    });

    this.form = this.fb.group({
      fullName:      ['', [Validators.required]],
      dob:           ['', [Validators.required]],
      classApplying: ['', [Validators.required]],
      gender:        ['', [Validators.required]],
      parentName:    ['', [Validators.required]],
      parentPhone:   ['', [Validators.required, Validators.minLength(7)]],
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  errorFor(field: AdmissionField): string | null {
    const labels: Record<AdmissionField, string> = {
      fullName:      'Full name',
      dob:           'Date of birth',
      classApplying: 'Class',
      gender:        'Gender',
      parentName:    'Parent / guardian name',
      parentPhone:   'Contact number',
    };

    if (field === 'parentPhone') {
      return fieldError(this.form.get(field), labels[field], {
        minlength: 'Enter a valid phone number',
      });
    }

    return fieldError(this.form.get(field), labels[field]);
  }

  submit(): void {
    if (!this.admissionsOpen) return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.submitError = null;
    const payload = this.form.value as AdmissionApplication;

    this.subs.add(
      this.admissionService.submitApplication(payload).subscribe({
        next: () => {
          this.submitted = true;
          this.submitting = false;
          this.scrollToTop();
        },
        error: (err: HttpErrorResponse) => {
          this.submitting = false;
          this.submitError = err.error?.message ?? 'Could not submit application. Please try again.';
        },
      }),
    );
  }

  private scrollToTop(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
}
