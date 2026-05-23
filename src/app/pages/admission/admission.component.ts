import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CheckCircle, LucideIconData } from 'lucide-angular';
import { classOptions, ADMISSION_SUCCESS } from '../../data/admission';
import { TranslationService } from '../../services/translation.service';
import { SeoService } from '../../services/seo.service';
import type { Translations } from '../../translations/en';

const CLASS_11 = ['class-11-science', 'class-11-management', 'class-11-hm'];

@Component({
  selector: 'app-admission-page',
  templateUrl: './admission.component.html',
})
export class AdmissionComponent implements OnInit, OnDestroy {
  readonly admissionSuccess = ADMISSION_SUCCESS;
  readonly checkCircle: LucideIconData = CheckCircle;

  readonly classOptions = [{ value: '', label: 'Select Class' }, ...classOptions];

  form!: FormGroup;
  submitted = false;
  t!: Translations;
  private subs = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly translation: TranslationService,
    private readonly seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.t = this.translation.t;
    this.subs.add(this.translation.t$.subscribe((v) => (this.t = v)));

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
    this.submitted = true;
  }
}
