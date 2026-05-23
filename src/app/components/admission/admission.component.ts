import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CheckCircle, LucideIconData } from 'lucide-angular';

import type {
  ClassOption, AdmissionApplication, AdmissionSuccessMessage,
} from '../../models/admission.model';
import { AdmissionService } from '../../services/admission.service';
import { ADMISSION_COPY } from './admission.data';
import { SeoService } from '../../services/seo.service';

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

  form!: FormGroup;
  submitted = false;
  submitting = false;

  private subs = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly admissionService: AdmissionService,
    private readonly seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.admissionService.getClassOptions().subscribe((opts) => (this.classOptions = opts)),
    );
    this.subs.add(
      this.admissionService.getSuccessMessage().subscribe((m) => (this.admissionSuccess = m)),
    );

    this.seo.update({
      title:       'Admission',
      description: 'Apply for admission. Form placeholder — connect to your backend when ready.',
      path:        '/admission',
    });

    this.form = this.fb.group({
      fullName:        ['', [Validators.required]],
      dob:             ['', [Validators.required]],
      classApplying:   ['', [Validators.required]],
      gender:          ['', [Validators.required]],
      parentName:      ['', [Validators.required]],
      parentPhone:     ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const payload = this.form.value as AdmissionApplication;

    this.subs.add(
      this.admissionService.submitApplication(payload).subscribe({
        next: () => {
          this.submitted = true;
          this.submitting = false;
        },
        error: () => {
          this.submitting = false;
        },
      }),
    );
  }
}
