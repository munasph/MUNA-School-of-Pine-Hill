import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeoService } from '../../../services/seo.service';
import { SchoolInfoService, type SchoolInfo } from '../../../services/school-info.service';

@Component({
  selector: 'app-portal-coming-soon',
  templateUrl: './portal-coming-soon.component.html',
  styleUrls: ['./portal-coming-soon.component.css'],
})
export class PortalComingSoonComponent implements OnInit, OnDestroy {
  schoolInfo!: SchoolInfo;

  private subs = new Subscription();

  constructor(
    private readonly seo: SeoService,
    private readonly schoolInfoService: SchoolInfoService,
  ) {}

  ngOnInit(): void {
    this.schoolInfo = this.schoolInfoService.snapshot;
    this.subs.add(this.schoolInfoService.schoolInfo$.subscribe((info) => (this.schoolInfo = info)));

    this.seo.update({
      title:       'Family Portal',
      description: 'The MUNA School family and student portal is coming soon.',
      path:        '/portal',
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
