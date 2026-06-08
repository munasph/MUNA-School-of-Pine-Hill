import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { LegalService } from '../../services/legal.service';
import { SchoolInfoService, type SchoolInfo } from '../../services/school-info.service';

@Component({
  selector: 'app-terms-page',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css'],
})
export class TermsComponent implements OnInit, OnDestroy {
  schoolInfo!: SchoolInfo;
  today = '';

  private subs = new Subscription();

  constructor(
    private readonly legalService: LegalService,
    private readonly seo: SeoService,
    private readonly schoolInfoService: SchoolInfoService,
  ) {}

  ngOnInit(): void {
    this.schoolInfo = this.schoolInfoService.snapshot;
    this.subs.add(this.schoolInfoService.schoolInfo$.subscribe((info) => (this.schoolInfo = info)));

    this.subs.add(this.legalService.getDocument('terms').subscribe((doc) => {
      this.today = doc.lastUpdated;
    }));

    this.seo.update({
      title:       'Terms of Service',
      description: `Terms of service for using the ${this.schoolInfo.name} website. Read our terms and conditions.`,
      path:        '/terms',
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
