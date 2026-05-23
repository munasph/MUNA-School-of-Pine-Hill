import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _theme$ = new BehaviorSubject<Theme>('light');
  readonly theme$ = this._theme$.asObservable();

  constructor(
    @Inject(DOCUMENT) private readonly doc: Document,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const saved = (window.localStorage.getItem('theme') as Theme | null) ?? 'light';
      this.setTheme(saved);
    } else {
      this.applyTheme('light');
    }
  }

  get theme(): Theme {
    return this._theme$.value;
  }

  setTheme(t: Theme): void {
    this._theme$.next(t);
    this.applyTheme(t);
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.setItem('theme', t);
    }
  }

  toggle(): void {
    this.setTheme(this.theme === 'dark' ? 'light' : 'dark');
  }

  private applyTheme(t: Theme): void {
    this.doc.documentElement.setAttribute('data-theme', t);
  }
}
