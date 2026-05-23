import { Component, Input } from '@angular/core';

export type GlassCardIntensity = 'light' | 'mid' | 'strong';

@Component({
  selector: 'app-glass-card',
  template: `
    <div appReveal
         class="rounded-2xl border backdrop-blur-xl relative"
         [class]="intensityClasses + ' ' + hoverClasses + ' ' + extraClass"
         [style.box-shadow]="intensity === 'strong' ? '0 8px 32px var(--shadow-glass)' : null">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`:host { display: block; }`],
})
export class GlassCardComponent {
  @Input() intensity: GlassCardIntensity = 'mid';
  @Input() hover = false;
  @Input() extraClass = '';

  get intensityClasses(): string {
    return {
      light:  'bg-[var(--glass-bg)] border-[var(--glass-border)]',
      mid:    'bg-[var(--glass-bg-mid)] border-[var(--glass-border)]',
      strong: 'bg-[var(--glass-bg-strong)] border-[var(--glass-border-strong)]',
    }[this.intensity];
  }

  get hoverClasses(): string {
    return this.hover
      ? 'hover:bg-[var(--glass-bg-strong)] hover:border-[var(--glass-border-strong)] hover:-translate-y-1 transition-all duration-300 cursor-pointer'
      : '';
  }
}
