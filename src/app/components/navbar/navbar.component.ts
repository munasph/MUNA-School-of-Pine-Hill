import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { Menu, X, LucideIconData } from 'lucide-angular';
import { NAV_COPY, NAV_LINKS, SCHOOL_INFO } from '../footer/site.data';

const LIGHT_SURFACE_ROUTES = ['/admission', '/login', '/signup', '/privacy', '/terms'];

/** Auth pill links shown in the right-side navbar group. */
const AUTH_NAV_LINKS = [
  { path: '/login',  label: 'Log in'  },
  { path: '/signup', label: 'Sign up' },
] as const;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  readonly navLinks   = NAV_LINKS;
  readonly authLinks  = AUTH_NAV_LINKS;
  readonly schoolInfo = SCHOOL_INFO;
  readonly t          = NAV_COPY;
  readonly menuIcon:  LucideIconData = Menu;
  readonly closeIcon: LucideIconData = X;

  currentPath = '/';
  scrolled    = false;
  isOpen      = false;

  private subs = new Subscription();

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.currentPath = this.router.url.split('?')[0].split('#')[0] || '/';
    this.subs.add(
      this.router.events
        .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
        .subscribe((e) => {
          this.currentPath = (e.urlAfterRedirects || e.url).split('?')[0].split('#')[0] || '/';
          this.isOpen = false;
        }),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 20;
  }

  get lightSurface(): boolean {
    return LIGHT_SURFACE_ROUTES.includes(this.currentPath);
  }

  isActive(path: string): boolean {
    return path === '/'
      ? this.currentPath === '/'
      : this.currentPath.startsWith(path);
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  pillBackground(): string {
    if (this.scrolled)      return 'rgba(255,255,255,0.72)';
    if (this.lightSurface)  return 'rgba(255,255,255,0.85)';
    return 'rgba(255,255,255,0.12)';
  }
  pillBorder(): string {
    if (this.scrolled)      return '1px solid rgba(0,134,75,0.18)';
    if (this.lightSurface)  return '1px solid rgba(148,163,184,0.18)';
    return '1px solid rgba(255,255,255,0.30)';
  }
  pillShadow(): string {
    if (this.scrolled) {
      return '0 4px 24px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.80)';
    }
    return '0 4px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.20)';
  }

  linkColor(active: boolean): string {
    if (active) {
      return this.scrolled || this.lightSurface ? '#00864B' : 'white';
    }
    return this.scrolled || this.lightSurface ? '#334155' : 'rgba(255,255,255,0.88)';
  }
  linkBackground(active: boolean): string {
    if (!active) return 'transparent';
    return this.scrolled || this.lightSurface
      ? 'rgba(0,134,75,0.12)'
      : 'rgba(255,255,255,0.18)';
  }

  burgerColor(): string {
    return this.scrolled || this.lightSurface
      ? 'var(--text-secondary)'
      : 'rgba(255,255,255,0.88)';
  }

  brandTitleColor(): string {
    return this.lightSurface ? '#0F172A' : '#ffffff';
  }
  brandSubtitleColor(): string {
    return this.lightSurface ? 'rgba(15,23,42,0.68)' : 'rgba(255,255,255,0.85)';
  }
}
