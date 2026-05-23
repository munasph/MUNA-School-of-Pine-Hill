import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Sun, Moon, LucideIconData } from 'lucide-angular';
import { ThemeService, Theme } from '../../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button
      type="button"
      [attr.aria-label]="'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode'"
      (click)="toggle()"
      class="relative w-10 h-10 flex items-center justify-center rounded-full transition-all
             duration-300 cursor-pointer hover:scale-110 hover:shadow-lg"
      style="background: linear-gradient(135deg, rgba(79, 70, 229, 0.15), rgba(249, 115, 22, 0.1));
             border: 1.5px solid rgba(79, 70, 229, 0.25);
             color: #4F46E5;">
      <lucide-icon *ngIf="theme === 'dark'" [img]="moon" [size]="19" [strokeWidth]="2.5"
                   style="color: #4F46E5;"></lucide-icon>
      <lucide-icon *ngIf="theme === 'light'" [img]="sun"  [size]="19" [strokeWidth]="2.5"
                   style="color: #F97316;"></lucide-icon>
    </button>
  `,
})
export class ThemeToggleComponent implements OnInit, OnDestroy {
  readonly sun:  LucideIconData = Sun;
  readonly moon: LucideIconData = Moon;

  theme: Theme = 'light';
  private sub?: Subscription;

  constructor(private readonly themeService: ThemeService) {}

  ngOnInit(): void {
    this.sub = this.themeService.theme$.subscribe((t) => (this.theme = t));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  toggle(): void {
    this.themeService.toggle();
  }
}
