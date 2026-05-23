import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CheckCircle, LucideIconData } from 'lucide-angular';

import type {
  ClassOption, AdmissionApplication, AdmissionSuccessMessage,
} from '../../models/admission.model';
import { AdmissionService } from '../../services/admission.service';
import { TranslationService } from '../../services/translation.service';
import { SeoService } from '../../services/seo.service';
import type { Translations } from '../../translations/en';

const CLASS_11 = ['class-11-science', 'class-11-management', 'class-11-hm'];

@Component({
  selector: 'app-admission-page',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css'],
})
export class AdmissionComponent implements OnInit, OnDestroy {
  admissionSuccess: AdmissionSuccessMessage = { title: '', message: '' };
  readonly checkCircle: LucideIconData = CheckCircle;

  classOptions: ClassOption[] = [];

  form!: FormGroup;
  submitted = false;
  submitting = false;
  t!: Translations;

  private subs = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly admissionService: AdmissionService,
    private readonly translation: TranslationService,
    private readonly seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.t = this.translation.t;
    this.subs.add(this.translation.t$.subscribe((v) => (this.t = v)));

    this.subs.add(
      this.admissionService.getClassOptions().subscribe((opts) => (this.classOptions = opts)),
    );
    this.subs.add(
      this.admissionService.getSuccessMessage().subscribe((m) => (this.admissionSuccess = m)),
    );

    this.seo.update({
      title:       'Admission',
      description: 'Apply for admission. Open for Kindergarten to Grade 12 across all academic streams.',
      path:        '/admission',
    });

    this.form = this.fb.group({
      fullName:        ['', [Validators.required]],
      dob:             ['', [Validators.required]],
      classApplying:   ['', [Validators.required]],
      gender:          ['', [Validators.required]],
      seeGpa:          [''],
      previousSchool:  [''],
      parentName:      ['', [Validators.required]],
      parentPhone:     ['', [Validators.required]],
    });

    this.subs.add(
      this.form.get('classApplying')!.valueChanges.subscribe((v: string) => {
        const seeGpa         = this.form.get('seeGpa')!;
        const previousSchool = this.form.get('previousSchool')!;
        if (CLASS_11.includes(v)) {
          seeGpa.setValidators([Validators.required, Validators.min(0), Validators.max(4)]);
          previousSchool.setValidators([Validators.required]);
        } else {
          seeGpa.clearValidators();
          previousSchool.clearValidators();
        }
        seeGpa.updateValueAndValidity();
        previousSchool.updateValueAndValidity();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  get class11Selected(): boolean {
    return CLASS_11.includes(this.form?.get('classApplying')?.value);
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
