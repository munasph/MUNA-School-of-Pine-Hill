import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CheckCircle, ChevronLeft, ChevronRight, LucideIconData } from 'lucide-angular';

import type {
  AboutHero, VisionItem, FacultyMember, TeachingFacultyPhoto,
} from '../../models/about.model';
import { AboutService } from '../../services/about.service';
import { SCHOOL_INFO } from '../../data/site';
import { TranslationService } from '../../services/translation.service';
import { SeoService } from '../../services/seo.service';
import type { Translations } from '../../translations/en';

@Component({
  selector: 'app-about-page',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit, OnDestroy, AfterViewInit {
  heroData!:               AboutHero;
  visionItems:             VisionItem[]            = [];
  keyFaculty:              FacultyMember[]         = [];
  teachingFacultyPhotos:   TeachingFacultyPhoto[]  = [];
  readonly schoolInfo = SCHOOL_INFO;

  readonly check:        LucideIconData = CheckCircle;
  readonly chevronLeft:  LucideIconData = ChevronLeft;
  readonly chevronRight: LucideIconData = ChevronRight;

  @ViewChild('carousel') carousel?: ElementRef<HTMLDivElement>;

  t!: Translations;
  private subs = new Subscription();

  constructor(
    private readonly aboutService: AboutService,
    private readonly translation: TranslationService,
    private readonly seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.t = this.translation.t;
    this.subs.add(this.translation.t$.subscribe((v) => (this.t = v)));

    this.subs.add(
      this.aboutService.getContent().subscribe((c) => {
        this.heroData              = c.hero;
        this.visionItems           = c.visionItems;
        this.keyFaculty            = c.keyFaculty;
        this.teachingFacultyPhotos = c.teachingFaculty;
      }),
    );

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
    this.subs.unsubscribe();
  }

  scrollCarousel(direction: -1 | 1): void {
    this.carousel?.nativeElement.scrollBy({ left: 140 * direction, behavior: 'smooth' });
  }
}
