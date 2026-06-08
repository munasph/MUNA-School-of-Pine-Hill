import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { Menu, X, LucideIconData } from 'lucide-angular';
import { NAV_COPY, NAV_LINKS, SCHOOL_INFO } from '../footer/site.data';
import { AuthService } from '../../services/auth.service';
import { PortalAuthService } from '../../services/portal-auth.service';
import { ThemeService, Theme } from '../../services/theme.service';

const ADMIN_HOME = '/admin';
/** Routes with light page backgrounds in light theme — navbar uses dark text / light pills */
const LIGHT_SURFACE_ROUTES = [
  '/admission', '/admission/policy', '/tuition', '/login', '/staff-signup',
  '/set-password', '/forgot-password', '/reset-password', '/portal',
  '/portal/login', '/portal/signup', '/privacy', '/terms', '/faq', '/admin',
];

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  readonly navLinks   = NAV_LINKS;
  readonly schoolInfo = SCHOOL_INFO;
  authNavLinks: { path: string; label: string }[] = [];
  readonly t          = NAV_COPY;
  readonly menuIcon:  LucideIconData = Menu;
  readonly closeIcon: LucideIconData = X;

  currentPath = '/';
  scrolled    = false;
  isOpen      = false;
  theme: Theme  = 'dark';

  private subs = new Subscription();

  constructor(
    private readonly router: Router,
    private readonly auth: AuthService,
    private readonly portalAuth: PortalAuthService,
    private readonly themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.currentPath = this.router.url.split('?')[0].split('#')[0] || '/';
    this.theme = this.themeService.theme;
    this.updateAuthNavLinks();
    this.subs.add(this.themeService.theme$.subscribe((t) => (this.theme = t)));
    this.subs.add(this.auth.session$.subscribe(() => this.updateAuthNavLinks()));
    this.subs.add(this.portalAuth.session$.subscribe(() => this.updateAuthNavLinks()));
    this.subs.add(
      this.router.events
        .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
        .subscribe((e) => {
          this.currentPath = (e.urlAfterRedirects || e.url).split('?')[0].split('#')[0] || '/';
          this.setMenuOpen(false);
          this.updateAuthNavLinks();
        }),
    );
  }

  private updateAuthNavLinks(): void {
    const links: { path: string; label: string }[] = [];

    if (this.portalAuth.isAuthenticated()) {
      links.push({ path: '/portal', label: 'My portal' });
    } else {
      links.push({ path: '/portal', label: 'Family portal' });
    }

    if (this.auth.isAuthenticated() && this.auth.isAdmin()) {
      links.push({ path: ADMIN_HOME, label: 'Admin' });
    } else {
      links.push({ path: '/login', label: 'Staff login' });
    }

    this.authNavLinks = links;
  }

  ngOnDestroy(): void {
    this.setMenuOpen(false);
    this.subs.unsubscribe();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 20;
  }

  isActive(path: string): boolean {
    return path === '/'
      ? this.currentPath === '/'
      : this.currentPath.startsWith(path);
  }

  toggle(): void {
    this.setMenuOpen(!this.isOpen);
  }

  closeMenu(): void {
    this.setMenuOpen(false);
  }

  private setMenuOpen(open: boolean): void {
    this.isOpen = open;
    document.body.style.overflow = open ? 'hidden' : '';
  }

  /** Light frosted navbar chrome (dark text) vs dark hero chrome (white text) */
  get lightNavChrome(): boolean {
    if (this.theme === 'dark') return false;
    if (this.scrolled) return true;
    return LIGHT_SURFACE_ROUTES.some(
      (route) => this.currentPath === route || this.currentPath.startsWith(route + '/'),
    );
  }

  pillBackground(): string {
    if (this.lightNavChrome) {
      return this.scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.88)';
    }
    if (this.scrolled) return 'rgba(255,255,255,0.72)';
    return 'rgba(255,255,255,0.12)';
  }
  pillBorder(): string {
    if (this.lightNavChrome) {
      return '1.5px solid rgba(0,134,75,0.35)';
    }
    if (this.scrolled) return '1px solid rgba(0,134,75,0.18)';
    return '1px solid rgba(255,255,255,0.30)';
  }
  pillShadow(): string {
    if (this.lightNavChrome) {
      return '0 2px 12px rgba(0,134,75,0.08), inset 0 1px 0 rgba(255,255,255,0.95)';
    }
    if (this.scrolled) {
      return '0 4px 24px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.80)';
    }
    return '0 4px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.20)';
  }

  linkColor(active: boolean): string {
    if (this.lightNavChrome) {
      return active ? '#00864B' : '#334155';
    }
    if (active) {
      return this.scrolled ? '#00864B' : 'white';
    }
    return this.scrolled ? '#334155' : 'rgba(255,255,255,0.88)';
  }
  linkBackground(active: boolean): string {
    if (!active) return 'transparent';
    if (this.lightNavChrome) return 'rgba(0,134,75,0.12)';
    return this.scrolled
      ? 'rgba(0,134,75,0.12)'
      : 'rgba(255,255,255,0.18)';
  }

  burgerColor(): string {
    if (this.lightNavChrome) return 'var(--text-secondary)';
    return this.scrolled
      ? 'var(--text-secondary)'
      : 'rgba(255,255,255,0.88)';
  }
}
