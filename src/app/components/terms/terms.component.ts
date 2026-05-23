import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { LegalService } from '../../services/legal.service';
import { SCHOOL_INFO } from '../footer/site.data';

@Component({
  selector: 'app-terms-page',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css'],
})
export class TermsComponent implements OnInit, OnDestroy {
  readonly schoolInfo = SCHOOL_INFO;
  today = '';

  private sub?: Subscription;

  constructor(
    private readonly legalService: LegalService,
    private readonly seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.sub = this.legalService.getDocument('terms').subscribe((doc) => {
      this.today = doc.lastUpdated;
    });

    this.seo.update({
      title:       'Terms of Service',
      description: `Terms of service for using the ${SCHOOL_INFO.name} website. Read our terms and conditions.`,
      path:        '/terms',
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
