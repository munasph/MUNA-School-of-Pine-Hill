import {
  Component, HostListener, OnDestroy, OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import {
  ArrowRight, ClipboardList, Award, Facebook, Mail, Linkedin,
  BookOpen, GraduationCap, Trophy, Globe, Pencil, Star, Atom, Ruler,
  LucideIconData,
} from 'lucide-angular';

import type { Stat, Feature, PrincipalMessage } from '../../models/home.model';
import { HomeService } from '../../services/home.service';
import { SCHOOL_INFO } from '../footer/site.data';
import { HOME_COPY } from './home.data';
import { SeoService } from '../../services/seo.service';

interface FloatingEduIcon {
  icon:  LucideIconData;
  left:  string;
  top:   string;
  size:  number;
  anim:  string;
  dur:   string;
  delay: string;
}

interface CollageCell {
  src:   string;
  pos:   string;
  anim:  string;
  dur:   string;
  delay: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  stats:            Stat[]            = [];
  features:         Feature[]         = [];
  principalMessage!: PrincipalMessage;
  readonly schoolInfo = SCHOOL_INFO;

  readonly arrowRight:   LucideIconData = ArrowRight;
  readonly clipboard:    LucideIconData = ClipboardList;
  readonly award:        LucideIconData = Award;
  readonly facebook:     LucideIconData = Facebook;
  readonly mail:         LucideIconData = Mail;
  readonly linkedin:     LucideIconData = Linkedin;

  readonly floatingIcons: FloatingEduIcon[] = [
    { icon: BookOpen,      left: '3%',  top: '8%',  size: 80, anim: 'eduFloatA', dur: '11s', delay: '0s'   },
    { icon: GraduationCap, left: '86%', top: '6%',  size: 72, anim: 'eduFloatB', dur: '14s', delay: '2s'   },
    { icon: Pencil,        left: '8%',  top: '68%', size: 60, anim: 'eduFloatC', dur: '9s',  delay: '1s'   },
    { icon: Star,          left: '80%', top: '66%', size: 56, anim: 'eduFloatA', dur: '13s', delay: '3.5s' },
    { icon: Atom,          left: '45%', top: '2%',  size: 68, anim: 'eduFloatD', dur: '12s', delay: '1.5s' },
    { icon: Trophy,        left: '68%', top: '76%', size: 62, anim: 'eduFloatB', dur: '15s', delay: '4s'   },
    { icon: Globe,         left: '22%', top: '80%', size: 64, anim: 'eduFloatC', dur: '10s', delay: '0.5s' },
    { icon: Ruler,         left: '58%', top: '12%', size: 52, anim: 'eduFloatD', dur: '16s', delay: '5s'   },
  ];

  readonly collage: CollageCell[] = [
    { src: '/assets/images/webp/college1.webp', pos: 'center center', anim: 'collageZoom',    dur: '14s', delay: '0s'   },
    { src: '/assets/images/webp/college2.webp', pos: 'center 30%',    anim: 'collageZoomAlt', dur: '16s', delay: '2s'   },
    { src: '/assets/images/webp/college3.webp', pos: 'center center', anim: 'collageZoom',    dur: '12s', delay: '1s'   },
    { src: '/assets/images/webp/college4.webp', pos: 'center 20%',    anim: 'collageZoomAlt', dur: '15s', delay: '3s'   },
    { src: '/assets/images/webp/college5.webp', pos: 'center center', anim: 'collageZoom',    dur: '13s', delay: '0.5s' },
    { src: '/assets/images/webp/college6.webp', pos: 'center top',    anim: 'collageZoomAlt', dur: '17s', delay: '1.5s' },
  ];

  readonly principalSocials = [
    { icon: Facebook as LucideIconData, href: 'https://facebook.com/yourschool',      label: 'Facebook' },
    { icon: Mail     as LucideIconData, href: 'mailto:principal@yourschool.example',  label: 'Email' },
    { icon: Linkedin as LucideIconData, href: 'https://linkedin.com/school/yourschool', label: 'LinkedIn' },
  ];

  readonly t = HOME_COPY;
  scrollY = 0;

  private subs = new Subscription();

  constructor(
    private readonly homeService: HomeService,
    private readonly seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.homeService.getContent().subscribe((c) => {
        this.stats             = c.stats;
        this.features          = c.features;
        this.principalMessage  = c.principalMessage;
      }),
    );

    this.seo.update({
      title:       SCHOOL_INFO.name,
      description: 'Quality K-12 education from kindergarten through senior secondary. Enrol now.',
      path:        '/',
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrollY = window.scrollY;
  }

  parallaxStyle(): Record<string, string> {
    return { transform: `translateY(${this.scrollY * 0.4}px)` };
  }
}
