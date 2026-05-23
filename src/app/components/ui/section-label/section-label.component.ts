import { Component } from '@angular/core';

@Component({
  selector: 'app-section-label',
  template: `
    <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4"
          [style.color]="'var(--accent)'">
      <span class="w-5 h-px inline-block"
            [style.backgroundColor]="'var(--accent)'"
            [style.opacity]="0.5"></span>
      <ng-content></ng-content>
      <span class="w-5 h-px inline-block"
            [style.backgroundColor]="'var(--accent)'"
            [style.opacity]="0.5"></span>
    </span>
  `,
})
export class SectionLabelComponent {}
