import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { SCHOOL_INFO } from '../footer/site.data';

interface FaqEntry {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent implements OnInit {
  readonly schoolInfo = SCHOOL_INFO;

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

  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.update({
      title:       'FAQ',
      description: `Frequently asked questions about ${SCHOOL_INFO.name} — admissions, programs, hours and more.`,
      path:        '/faq',
    });
  }
}
