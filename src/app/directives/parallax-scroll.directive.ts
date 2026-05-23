import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Translates the host element vertically based on scrollY * factor.
 * Mirrors the home-page hero parallax in the source React project.
 */
@Directive({ selector: '[appParallax]' })
export class ParallaxScrollDirective implements AfterViewInit {
  @Input('appParallax') factor = 0.4;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.update(window.scrollY);
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.update(window.scrollY);
    }
  }

  private update(y: number): void {
    this.renderer.setStyle(this.el.nativeElement, 'transform', `translateY(${y * this.factor}px)`);
  }
}
