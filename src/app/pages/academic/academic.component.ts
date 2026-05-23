import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { courses, higherSecondary, achievements } from '../../data/academic';
import { TranslationService } from '../../services/translation.service';
import { SeoService } from '../../services/seo.service';
import type { Translations } from '../../translations/en';

@Component({
  selector: 'app-academic-page',
  templateUrl: './academic.component.html',
})
export class AcademicComponent implements OnInit, OnDestroy {
  readonly courses          = courses;
  readonly higherSecondary  = higherSecondary;
  readonly achievements     = achievements;

  t!: Translations;
  private sub?: Subscription;

  constructor(
    private readonly translation: TranslationService,
    private readonly seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.t = this.translation.t;
    this.sub = this.translation.t$.subscribe((v) => (this.t = v));

    this.seo.update({
      title:       'Academic Programmes',
      description: 'Explore our academic programmes from Kindergarten through senior secondary.',
      path:        '/academic',
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
