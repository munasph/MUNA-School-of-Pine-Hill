import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { SCHOOL_INFO } from '../../data/site';

@Component({
  selector: 'app-terms-page',
  templateUrl: './terms.component.html',
})
export class TermsComponent implements OnInit {
  readonly schoolInfo = SCHOOL_INFO;
  readonly today      = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.update({
      title:       'Terms of Service',
      description: `Terms of service for using the ${SCHOOL_INFO.name} website. Read our terms and conditions.`,
      path:        '/terms',
    });
  }
}
