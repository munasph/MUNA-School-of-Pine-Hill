import { Component } from '@angular/core';

@Component({
  selector: 'app-gradient-background',
  template: `
    <div class="fixed inset-0 -z-10" aria-hidden="true">
      <div class="absolute inset-0" [style.background-color]="'var(--bg-deep)'"></div>

      <div class="orb"
           style="top: 0%; left: 25%; width: 800px; height: 800px; opacity: 0.6;"
           [style.background-color]="'var(--orb-1-color)'"></div>
      <div class="orb"
           style="bottom: 25%; right: 25%; width: 600px; height: 600px; opacity: 0.5;"
           [style.background-color]="'var(--orb-2-color)'"></div>
      <div class="orb"
           style="top: 50%; right: 0%; width: 500px; height: 500px; opacity: 0.4;"
           [style.background-color]="'var(--orb-3-color)'"></div>
    </div>
  `,
})
export class GradientBackgroundComponent {}
