import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { en, type Translations } from '../translations/en';

/**
 * Single-language translation accessor. Kept as a service (with both a
 * synchronous `t` snapshot and a `t$` observable) so all existing call
 * sites — and any future multi-language work — keep working untouched.
 */
@Injectable({ providedIn: 'root' })
export class TranslationService {
  readonly t$: Observable<Translations> = of(en);

  get t(): Translations {
    return en;
  }
}
