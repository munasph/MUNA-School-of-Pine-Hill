import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import type { Course, HigherSecondaryStream, Achievement } from '../../models/academic.model';
import { AcademicService } from '../../services/academic.service';
import { ACADEMIC_COPY } from './academic.data';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-academic-page',
  templateUrl: './academic.component.html',
  styleUrls: ['./academic.component.css'],
})
export class AcademicComponent implements OnInit, OnDestroy {
  courses:         Course[]                = [];
  higherSecondary: HigherSecondaryStream[] = [];
  achievements:    Achievement[]           = [];

  readonly t = ACADEMIC_COPY;
  private subs = new Subscription();

  constructor(
    private readonly academicService: AcademicService,
    private readonly seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.academicService.getContent().subscribe((c) => {
        this.courses         = c.courses;
        this.higherSecondary = c.higherSecondary;
        this.achievements    = c.achievements;
      }),
    );

    this.seo.update({
      title:       'Academic Programmes',
      description: 'Academic programmes placeholder. Add your curriculum details when ready.',
      path:        '/academic',
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
