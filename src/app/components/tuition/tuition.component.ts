import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeoService } from '../../services/seo.service';
import { SchoolInfoService, type SchoolInfo } from '../../services/school-info.service';
import { TUITION_COPY } from './tuition.data';

@Component({
  selector: 'app-tuition-page',
  templateUrl: './tuition.component.html',
  styleUrls: ['./tuition.component.css'],
})
export class TuitionComponent implements OnInit, OnDestroy {
  readonly t = TUITION_COPY;
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
      title:       'Tuition',
      description: `MSPH Tuition 2026/2027 at ${this.schoolInfo.name}. Pre-K and Kindergarten rates, enrollment fees, and payment plans.`,
      path:        '/tuition',
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
