import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { SchoolInfoService, type SchoolInfo } from '../../services/school-info.service';

interface FaqEntry {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent implements OnInit, OnDestroy {
  schoolInfo!: SchoolInfo;

  readonly faqs: FaqEntry[] = [
    {
      question: 'How do I apply for admission?',
      answer:
        'You can start an application any time from our Admission page. Fill out the form and our team will reach out with the next steps.',
    },
    {
      question: 'What grade levels do you offer?',
      answer:
        'We are a new and growing school. Details about the grade levels we offer will be published here soon.',
    },
    {
      question: 'What are the school hours?',
      answer:
        'Our regular school hours will be posted here. For now, please contact the office for the most up-to-date schedule.',
    },
    {
      question: 'How can I contact the school?',
      answer:
        'You can reach us through the Contact page, or email us directly and a member of our team will get back to you.',
    },
  ];

  private subs = new Subscription();

  constructor(
    private readonly seo: SeoService,
    private readonly schoolInfoService: SchoolInfoService,
  ) {}

  ngOnInit(): void {
    this.schoolInfo = this.schoolInfoService.snapshot;
    this.subs.add(this.schoolInfoService.schoolInfo$.subscribe((info) => (this.schoolInfo = info)));

    this.seo.update({
      title:       'FAQ',
      description: `Frequently asked questions about ${this.schoolInfo.name} — admissions, programs, hours and more.`,
      path:        '/faq',
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
