import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import type { Course, HigherSecondaryStream, Achievement } from '../../models/academic.model';
import { AcademicService } from '../../services/academic.service';
import { TranslationService } from '../../services/translation.service';
import { SeoService } from '../../services/seo.service';
import type { Translations } from '../../translations/en';

@Component({
  selector: 'app-academic-page',
  templateUrl: './academic.component.html',
  styleUrls: ['./academic.component.css'],
})
export class AcademicComponent implements OnInit, OnDestroy {
  courses:         Course[]                = [];
  higherSecondary: HigherSecondaryStream[] = [];
  achievements:    Achievement[]           = [];

  t!: Translations;
  private subs = new Subscription();

  constructor(
    private readonly academicService: AcademicService,
    private readonly translation: TranslationService,
    private readonly seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.t = this.translation.t;
    this.subs.add(this.translation.t$.subscribe((v) => (this.t = v)));

    this.subs.add(
      this.academicService.getContent().subscribe((c) => {
        this.courses         = c.courses;
        this.higherSecondary = c.higherSecondary;
        this.achievements    = c.achievements;
      }),
    );

    this.seo.update({
      title:       'Academic Programmes',
      description: 'Explore our academic programmes from Kindergarten through senior secondary.',
      path:        '/academic',
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
