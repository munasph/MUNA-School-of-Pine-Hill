import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CheckCircle, ChevronLeft, ChevronRight, LucideIconData } from 'lucide-angular';
import { ABOUT_HERO, visionItems } from '../../data/about';
import { keyFaculty, teachingFacultyPhotos } from '../../data/faculty';
import { SCHOOL_INFO } from '../../data/site';
import { TranslationService } from '../../services/translation.service';
import { SeoService } from '../../services/seo.service';
import type { Translations } from '../../translations/en';

@Component({
  selector: 'app-about-page',
  templateUrl: './about.component.html',
})
export class AboutComponent implements OnInit, OnDestroy, AfterViewInit {
  readonly heroData               = ABOUT_HERO;
  readonly visionItems            = visionItems;
  readonly keyFaculty             = keyFaculty;
  readonly teachingFacultyPhotos  = teachingFacultyPhotos;
  readonly schoolInfo             = SCHOOL_INFO;

  readonly check:        LucideIconData = CheckCircle;
  readonly chevronLeft:  LucideIconData = ChevronLeft;
  readonly chevronRight: LucideIconData = ChevronRight;

  @ViewChild('carousel') carousel?: ElementRef<HTMLDivElement>;

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
      title:       'About Us',
      description: 'Learn about our school — our history, vision, mission, faculty, and commitment to quality education.',
      path:        '/about',
    });
  }

  ngAfterViewInit(): void {
    // no-op for now; reserved for future carousel auto-scroll logic
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  scrollCarousel(direction: -1 | 1): void {
    this.carousel?.nativeElement.scrollBy({ left: 140 * direction, behavior: 'smooth' });
  }
}
