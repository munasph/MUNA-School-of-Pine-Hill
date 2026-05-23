import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Animates the numeric portion of textContent from 0 → `appCountUp`
 * when the host element first enters the viewport. Preserves any
 * non-numeric prefix/suffix passed via the original string (e.g. "1,500+").
 */
@Directive({ selector: '[appCountUp]' })
export class CountUpDirective implements AfterViewInit, OnDestroy {
  @Input('appCountUp') target = '0';
  /** Total duration of the animation, in ms */
  @Input() countDuration = 1800;

  private observer?: IntersectionObserver;
  private started = false;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || typeof IntersectionObserver === 'undefined') {
      this.el.nativeElement.textContent = this.target;
      return;
    }

    const numericValue = parseInt(this.target.replace(/[^0-9]/g, ''), 10);
    const suffix = this.target.replace(/[\d,]/g, '').trim();
    const prefix = ''; // not needed for current data set

    if (!Number.isFinite(numericValue) || numericValue === 0) {
      this.el.nativeElement.textContent = this.target;
      return;
    }

    this.el.nativeElement.textContent = `0${suffix ? suffix : ''}`;

    this.observer = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e?.isIntersecting || this.started) return;
        this.started = true;
        this.tick(numericValue, prefix, suffix);
        this.observer?.disconnect();
      },
      { threshold: 0.5 },
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private tick(end: number, prefix: string, suffix: string): void {
    const startedAt = performance.now();
    const node = this.el.nativeElement;
    const animate = (now: number) => {
      const elapsed = now - startedAt;
      const progress = Math.min(elapsed / this.countDuration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * end);
      node.textContent = `${prefix}${current.toLocaleString()}${suffix}`;
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }
}
