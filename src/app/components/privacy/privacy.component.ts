import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { LegalService } from '../../services/legal.service';
import { SchoolInfoService, type SchoolInfo } from '../../services/school-info.service';

@Component({
  selector: 'app-privacy-page',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css'],
})
export class PrivacyComponent implements OnInit, OnDestroy {
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

    this.subs.add(this.legalService.getDocument('privacy').subscribe((doc) => {
      this.today = doc.lastUpdated;
    }));

    this.seo.update({
      title:       'Privacy Policy',
      description: `Privacy policy of ${this.schoolInfo.name}. Learn how we collect, use and protect your personal information.`,
      path:        '/privacy',
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
