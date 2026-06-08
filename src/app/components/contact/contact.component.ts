import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  MapPin, Phone, Mail, Calendar, CheckCircle, LucideIconData,
} from 'lucide-angular';

import type { ContactInfo, ContactMessage } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { SchoolInfoService, type SchoolInfo } from '../../services/school-info.service';
import { CONTACT_COPY, type ContactInfoKey } from './contact.data';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit, OnDestroy {
  schoolInfo!: SchoolInfo;

  contactInfo!: ContactInfo;

  readonly t = CONTACT_COPY;

  contactItems: Array<{
    icon: LucideIconData;
    key:  ContactInfoKey;
    detail: string;
  }> = [];

  readonly checkCircle: LucideIconData = CheckCircle;

  form!: FormGroup;
  submitted  = false;
  submitting = false;
  submitError: string | null = null;
  mapUrl!: SafeResourceUrl;

  private subs = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly contactService: ContactService,
    private readonly sanitizer: DomSanitizer,
    private readonly seo: SeoService,
    private readonly schoolInfoService: SchoolInfoService,
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.schoolInfoService.schoolInfo$.subscribe((info) => {
        this.schoolInfo = info;
        this.contactItems = [
          { icon: MapPin,   key: 'address', detail: info.address },
          { icon: Phone,    key: 'phone',   detail: info.phone },
          { icon: Mail,     key: 'email',   detail: info.email },
          { icon: Calendar, key: 'hours',   detail: info.officeHours },
        ];
      }),
    );

    this.subs.add(
      this.contactService.getInfo().subscribe((info) => {
        this.contactInfo = info;
        const raw = `https://maps.google.com/maps?q=${encodeURIComponent(info.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
        this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(raw);
      }),
    );

    this.seo.update({
      title:       'Contact Us',
      description: `Contact ${this.schoolInfoService.snapshot.name}. Reach our admissions team by phone, email, or visit us in Pine Hill, NJ.`,
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

    this.submitting = true;
    this.submitError = null;
    const payload = this.form.value as ContactMessage;

    this.subs.add(
      this.contactService.sendMessage(payload).subscribe({
        next: () => {
          this.submitted = true;
          this.submitting = false;
          this.form.reset({ name: '', email: '', subject: '', message: '' });
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          setTimeout(() => (this.submitted = false), 5000);
        },
        error: (err: HttpErrorResponse) => {
          this.submitting = false;
          this.submitError = err.error?.message ?? 'Could not send message. Please try again.';
        },
      }),
    );
  }
}
