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
import { SCHOOL_INFO } from '../footer/site.data';
import { CONTACT_COPY, type ContactInfoKey } from './contact.data';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit, OnDestroy {
  readonly schoolInfo = SCHOOL_INFO;

  contactInfo!: ContactInfo;

  readonly t = CONTACT_COPY;

  readonly contactItems: Array<{
    icon: LucideIconData;
    key:  ContactInfoKey;
    detail: string;
  }> = [
    { icon: MapPin,   key: 'address', detail: SCHOOL_INFO.address },
    { icon: Phone,    key: 'phone',   detail: SCHOOL_INFO.phone },
    { icon: Mail,     key: 'email',   detail: SCHOOL_INFO.email },
    { icon: Calendar, key: 'hours',   detail: SCHOOL_INFO.officeHours },
  ];

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
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.contactService.getInfo().subscribe((info) => {
        this.contactInfo = info;
        const raw = `https://maps.google.com/maps?q=${encodeURIComponent(info.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
        this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(raw);
      }),
    );

    this.seo.update({
      title:       'Contact Us',
      description: `Contact ${SCHOOL_INFO.name}. Placeholder contact details — update when ready.`,
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
