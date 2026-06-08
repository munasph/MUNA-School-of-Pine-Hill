import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CheckCircle, ChevronLeft, ChevronRight, LucideIconData } from 'lucide-angular';

import type {
  AboutHero, VisionItem, FacultyMember, TeachingFacultyPhoto,
} from '../../models/about.model';
import { AboutService } from '../../services/about.service';
import { SCHOOL_INFO } from '../footer/site.data';
import { ABOUT_COPY } from './about.data';
import { SeoService } from '../../services/seo.service';

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

  readonly t = ABOUT_COPY;
  private subs = new Subscription();

  constructor(
    private readonly aboutService: AboutService,
    private readonly seo: SeoService,
  ) {}

  ngOnInit(): void {
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
      description: 'Learn about MUNA School of Pine Hill — our history, mission, and commitment to faith-centered K–12 education in South Jersey.',
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
