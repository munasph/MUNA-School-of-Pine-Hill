import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly showPublicShell$: Observable<boolean>;

  constructor(private readonly router: Router) {
    this.showPublicShell$ = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => this.showPublicShellForUrl(event.urlAfterRedirects)),
      startWith(this.showPublicShellForUrl(this.router.url)),
    );
  }

  /** Public navbar/footer on marketing pages and portal login/signup only. */
  private showPublicShellForUrl(url: string): boolean {
    const path = url.split('?')[0].split('#')[0];
    if (path.startsWith('/admin')) return false;
    if (path.startsWith('/portal') && !path.startsWith('/portal/login') && !path.startsWith('/portal/signup')) {
      return false;
    }
    return true;
  }
}
