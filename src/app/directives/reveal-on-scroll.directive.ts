import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Drop-in Angular equivalent of Framer Motion's
 * `initial / whileInView` + `viewport={{ once: true }}` pattern.
 *
 * Usage:
 *   <div appReveal [revealDirection]="'left'" [revealDelay]="200">…</div>
 *
 * Pairs with `.reveal` / `.reveal--left|right` / `.is-visible` CSS in styles.css.
 */
@Directive({ selector: '[appReveal]' })
export class RevealOnScrollDirective implements AfterViewInit, OnDestroy {
  /** 'up' (default) | 'left' | 'right' */
  @Input() revealDirection: 'up' | 'left' | 'right' = 'up';
  /** Delay before transitioning, in ms */
  @Input() revealDelay = 0;
  /** Trigger threshold (0-1) */
  @Input() revealThreshold = 0.15;
  /** Only animate once (default true) */
  @Input() revealOnce = true;

  private observer?: IntersectionObserver;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {}

  ngAfterViewInit(): void {
    const host = this.el.nativeElement;

    this.renderer.addClass(host, 'reveal');
    if (this.revealDirection === 'left')  this.renderer.addClass(host, 'reveal--left');
    if (this.revealDirection === 'right') this.renderer.addClass(host, 'reveal--right');
    if (this.revealDelay > 0) {
      this.renderer.setStyle(host, 'transition-delay', `${this.revealDelay}ms`);
    }

    if (!isPlatformBrowser(this.platformId) || typeof IntersectionObserver === 'undefined') {
      this.renderer.addClass(host, 'is-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.renderer.addClass(host, 'is-visible');
            if (this.revealOnce) this.observer?.unobserve(host);
          } else if (!this.revealOnce) {
            this.renderer.removeClass(host, 'is-visible');
          }
        }
      },
      { threshold: this.revealThreshold },
    );
    this.observer.observe(host);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
