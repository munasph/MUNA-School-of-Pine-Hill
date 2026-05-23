import { Component, HostListener } from '@angular/core';
import { ChevronUp, LucideIconData } from 'lucide-angular';

@Component({
  selector: 'app-back-to-top',
  template: `
    <button *ngIf="visible"
            type="button"
            aria-label="Back to top"
            (click)="scrollTop()"
            class="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full
                   flex items-center justify-center backdrop-blur-xl border
                   transition-all hover:scale-105"
            [style.backgroundColor]="'var(--glass-bg-mid)'"
            [style.borderColor]="'var(--glass-border)'"
            [style.color]="'var(--text-primary)'">
      <lucide-icon [img]="chevronUp" size="22"></lucide-icon>
    </button>
  `,
})
export class BackToTopComponent {
  visible = false;
  readonly chevronUp: LucideIconData = ChevronUp;

  @HostListener('window:scroll')
  onScroll(): void {
    this.visible = window.scrollY > 400;
  }

  scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
