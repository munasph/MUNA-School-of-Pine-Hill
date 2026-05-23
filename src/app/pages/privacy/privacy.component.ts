import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { SCHOOL_INFO } from '../../data/site';

@Component({
  selector: 'app-privacy-page',
  templateUrl: './privacy.component.html',
})
export class PrivacyComponent implements OnInit {
  readonly schoolInfo = SCHOOL_INFO;
  readonly today      = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.update({
      title:       'Privacy Policy',
      description: `Privacy policy of ${SCHOOL_INFO.name}. Learn how we collect, use and protect your personal information.`,
      path:        '/privacy',
    });
  }
}
