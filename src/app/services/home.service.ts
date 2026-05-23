import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import type {
  HomeContent, Hero, PrincipalMessage,
  Stat, Feature, NewsItem, Testimonial, CTASection,
} from '../models/home.model';
import {
  HERO, PRINCIPAL_MESSAGE, stats, features,
  newsItems, testimonials, CTA_SECTION,
} from '../components/home/home.data';

/**
 * Home-page data access.
 *
 * Today every method returns static mock data via `of(...)`.
 * When a backend exists, swap each body to a real HTTP call:
 *   `return this.http.get<T>(\`${this.endpoint}/<resource>\`);`
 */
@Injectable({ providedIn: 'root' })
export class HomeService {
  private readonly endpoint = '/api/home';

  constructor(private readonly http: HttpClient) {}

  /** Returns the full bundle in one call. */
  getContent(): Observable<HomeContent> {
    return of<HomeContent>({
      hero:             HERO,
      principalMessage: PRINCIPAL_MESSAGE,
      stats,
      features,
      newsItems,
      testimonials,
      cta:              CTA_SECTION,
    });
  }

  getHero():             Observable<Hero>             { return of(HERO); }
  getPrincipalMessage(): Observable<PrincipalMessage> { return of(PRINCIPAL_MESSAGE); }
  getStats():            Observable<Stat[]>           { return of(stats); }
  getFeatures():         Observable<Feature[]>        { return of(features); }
  getNews():             Observable<NewsItem[]>       { return of(newsItems); }
  getTestimonials():     Observable<Testimonial[]>    { return of(testimonials); }
  getCta():              Observable<CTASection>       { return of(CTA_SECTION); }
}
