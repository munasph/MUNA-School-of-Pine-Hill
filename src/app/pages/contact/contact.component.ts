import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  MapPin, Phone, Mail, Calendar, CheckCircle, LucideIconData,
} from 'lucide-angular';
import { SCHOOL_INFO } from '../../data/site';
import { TranslationService } from '../../services/translation.service';
import { SeoService } from '../../services/seo.service';
import type { Translations } from '../../translations/en';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit, OnDestroy {
  readonly schoolInfo  = SCHOOL_INFO;

  readonly contactItems: Array<{
    icon: LucideIconData;
    key:  keyof Translations['contact']['info'];
    detail: string;
  }> = [
    { icon: MapPin,   key: 'address', detail: SCHOOL_INFO.address },
    { icon: Phone,    key: 'phone',   detail: SCHOOL_INFO.phone },
    { icon: Mail,     key: 'email',   detail: SCHOOL_INFO.email },
    { icon: Calendar, key: 'hours',   detail: SCHOOL_INFO.officeHours },
  ];

  readonly checkCircle: LucideIconData = CheckCircle;

  form!: FormGroup;
  submitted = false;
  t!: Translations;
  mapUrl!: SafeResourceUrl;

  private subs = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly translation: TranslationService,
    private readonly sanitizer: DomSanitizer,
    private readonly seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.t = this.translation.t;
    this.subs.add(this.translation.t$.subscribe((v) => (this.t = v)));

    const raw = `https://maps.google.com/maps?q=${encodeURIComponent(SCHOOL_INFO.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(raw);

    this.seo.update({
      title:       'Contact Us',
      description: `Get in touch with ${SCHOOL_INFO.name}. Call us, email us, or visit our campus.`,
      path:        '/contact',
    });

    this.form = this.fb.group({
      name:    ['', [Validators.required]],
      email:   ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  errorFor(name: 'name' | 'email' | 'subject' | 'message'): string | null {
    const c = this.form.get(name);
    if (!c || !c.touched || !c.errors) return null;
    if (c.errors['required']) {
      return name === 'name'    ? 'Name is required'
           : name === 'email'   ? 'Email is required'
           : name === 'subject' ? 'Subject is required'
           : 'Message is required';
    }
    if (c.errors['pattern']) return 'Invalid email format';
    return null;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted = true;
    this.form.reset({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => (this.submitted = false), 5000);
  }
}
