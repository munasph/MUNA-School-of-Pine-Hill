import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CheckCircle, LucideIconData } from 'lucide-angular';

import type {
  ClassOption, AdmissionApplication, AdmissionSuccessMessage,
} from '../../models/admission.model';
import { AdmissionService } from '../../services/admission.service';
import { SchoolInfoService } from '../../services/school-info.service';
import { ADMISSION_COPY, ADMISSION_SHOW_DOCUMENT_UPLOADS } from './admission.data';
import {
  ADMISSION_DOCUMENT_ACCEPT,
  ADMISSION_DOCUMENT_FIELDS,
  ADMISSION_DOCUMENT_GROUPS,
  ADMISSION_DOCUMENT_MAX_MB,
  type AdmissionDocumentField,
} from './admission-documents.data';
import { SeoService } from '../../services/seo.service';
import { fieldError } from '../../utils/form-validation';

type AdmissionField =
  | 'firstName' | 'lastName' | 'gender' | 'dob'
  | 'streetAddress' | 'city' | 'state' | 'zip' | 'classApplying'
  | 'parent1Name' | 'parent1Phone' | 'parent1Email'
  | 'parent2Name' | 'parent2Phone' | 'parent2Email';

@Component({
  selector: 'app-admission-page',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css'],
})
export class AdmissionComponent implements OnInit, OnDestroy {
  admissionSuccess: AdmissionSuccessMessage = { title: '', message: '' };
  readonly checkCircle: LucideIconData = CheckCircle;
  readonly t = ADMISSION_COPY;
  readonly showDocumentUploads = ADMISSION_SHOW_DOCUMENT_UPLOADS;
  readonly documentFields = ADMISSION_DOCUMENT_FIELDS;
  readonly documentGroups = ADMISSION_DOCUMENT_GROUPS;
  readonly documentAccept = ADMISSION_DOCUMENT_ACCEPT;
  readonly documentMaxMb = ADMISSION_DOCUMENT_MAX_MB;

  classOptions: ClassOption[] = [];
  admissionsOpen = true;
  settingsLoading = true;

  form!: FormGroup;
  documentFiles: Record<string, File | null> = {};
  documentErrors: Record<string, string | null> = {};
  submitted = false;
  submitting = false;
  submitError: string | null = null;

  private subs = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly admissionService: AdmissionService,
    private readonly schoolInfoService: SchoolInfoService,
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
      this.schoolInfoService.schoolInfo$.subscribe((info) => {
        this.admissionsOpen = info.admissionsOpen;
        this.settingsLoading = false;
      }),
    );

    this.seo.update({
      title:       'Registration',
      description: `Register for enrollment at ${this.schoolInfoService.snapshot.name}.`,
      path:        '/admission',
    });

    this.form = this.fb.group({
      firstName:     ['', [Validators.required]],
      lastName:      ['', [Validators.required]],
      gender:        ['', [Validators.required]],
      dob:           ['', [Validators.required]],
      streetAddress: ['', [Validators.required]],
      city:          ['', [Validators.required]],
      state:         ['', [Validators.required]],
      zip:           ['', [Validators.required]],
      classApplying: ['', [Validators.required]],
      parent1Name:   ['', [Validators.required]],
      parent1Phone:  ['', [Validators.required, Validators.minLength(7)]],
      parent1Email:  ['', [Validators.required, Validators.email]],
      parent2Name:   [''],
      parent2Phone:  [''],
      parent2Email:  ['', [Validators.email]],
    });

    for (const field of this.documentFields) {
      this.documentFiles[field.type] = null;
      this.documentErrors[field.type] = null;
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  errorFor(field: AdmissionField): string | null {
    const labels: Record<AdmissionField, string> = {
      firstName:     'First name',
      lastName:      'Last name',
      gender:        'Gender',
      dob:           'Date of birth',
      streetAddress: 'Street address',
      city:          'City',
      state:         'State',
      zip:           'ZIP code',
      classApplying: 'Grade',
      parent1Name:   'Parent / guardian 1 name',
      parent1Phone:  'Parent / guardian 1 phone',
      parent1Email:  'Parent / guardian 1 email',
      parent2Name:   'Parent / guardian 2 name',
      parent2Phone:  'Parent / guardian 2 phone',
      parent2Email:  'Parent / guardian 2 email',
    };

    if (field === 'parent1Phone' || field === 'parent2Phone') {
      return fieldError(this.form.get(field), labels[field], {
        minlength: 'Enter a valid phone number',
      });
    }

    if (field === 'parent1Email' || field === 'parent2Email') {
      return fieldError(this.form.get(field), labels[field], {
        email: 'Enter a valid email address',
      });
    }

    return fieldError(this.form.get(field), labels[field]);
  }

  documentsForGroup(group: AdmissionDocumentField['group']): AdmissionDocumentField[] {
    return this.documentFields.filter((field) => field.group === group);
  }

  onDocumentSelected(docType: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.documentErrors[docType] = null;

    if (!file) {
      this.documentFiles[docType] = null;
      return;
    }

    const extension = file.name.includes('.')
      ? file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
      : '';
    const allowed = ADMISSION_DOCUMENT_ACCEPT.split(',').map((ext) => ext.trim().toLowerCase());
    if (!allowed.includes(extension)) {
      this.documentFiles[docType] = null;
      input.value = '';
      this.documentErrors[docType] = 'Use PDF, DOC, DOCX, JPG, or PNG.';
      return;
    }

    if (file.size > ADMISSION_DOCUMENT_MAX_MB * 1024 * 1024) {
      this.documentFiles[docType] = null;
      input.value = '';
      this.documentErrors[docType] = `File must be ${ADMISSION_DOCUMENT_MAX_MB} MB or smaller.`;
      return;
    }

    this.documentFiles[docType] = file;
  }

  documentErrorFor(docType: string): string | null {
    return this.documentErrors[docType] ?? null;
  }

  selectedDocumentName(docType: string): string | null {
    return this.documentFiles[docType]?.name ?? null;
  }

  private hasDocumentValidationErrors(): boolean {
    return Object.values(this.documentErrors).some((error) => !!error);
  }

  private buildDocumentUploads() {
    return this.documentFields
      .filter((field) => this.documentFiles[field.type])
      .map((field) => ({
        docType: field.type,
        file:    this.documentFiles[field.type] as File,
      }));
  }

  submit(): void {
    if (!this.admissionsOpen) return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }

    if (this.form.invalid || (this.showDocumentUploads && this.hasDocumentValidationErrors())) {
      return;
    }

    this.submitting = true;
    this.submitError = null;
    const raw = this.form.value;
    const payload: AdmissionApplication = {
      firstName:     raw.firstName,
      lastName:      raw.lastName,
      gender:        raw.gender,
      dob:           raw.dob,
      streetAddress: raw.streetAddress,
      city:          raw.city,
      state:         raw.state,
      zip:           raw.zip,
      classApplying: raw.classApplying,
      parent1Name:   raw.parent1Name,
      parent1Phone:  raw.parent1Phone,
      parent1Email:  raw.parent1Email,
      parent2Name:   raw.parent2Name || undefined,
      parent2Phone:  raw.parent2Phone || undefined,
      parent2Email:  raw.parent2Email || undefined,
    };

    const documents = this.showDocumentUploads ? this.buildDocumentUploads() : [];
    const request$ = documents.length
      ? this.admissionService.submitApplicationWithDocuments(payload, documents)
      : this.admissionService.submitApplication(payload);

    this.subs.add(
      request$.subscribe({
        next: () => {
          this.submitted = true;
          this.submitting = false;
          this.scrollToTop();
        },
        error: (err: HttpErrorResponse) => {
          this.submitting = false;
          this.submitError = err.error?.message ?? 'Could not submit registration. Please try again.';
        },
      }),
    );
  }

  private scrollToTop(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
}
