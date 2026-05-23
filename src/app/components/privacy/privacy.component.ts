import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { LegalService } from '../../services/legal.service';
import { SCHOOL_INFO } from '../../data/site';

@Component({
  selector: 'app-privacy-page',
  templateUrl: './privacy.component.html',
})
export class PrivacyComponent implements OnInit, OnDestroy {
  readonly schoolInfo = SCHOOL_INFO;
  today = '';

  private sub?: Subscription;

  constructor(
    private readonly legalService: LegalService,
    private readonly seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.sub = this.legalService.getDocument('privacy').subscribe((doc) => {
      this.today = doc.lastUpdated;
    });

    this.seo.update({
      title:       'Privacy Policy',
      description: `Privacy policy of ${SCHOOL_INFO.name}. Learn how we collect, use and protect your personal information.`,
      path:        '/privacy',
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
