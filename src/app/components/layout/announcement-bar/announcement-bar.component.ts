import { Component } from '@angular/core';
import { ArrowRight, LucideIconData } from 'lucide-angular';
import { ANNOUNCEMENT } from '../../../data/site';

@Component({
  selector: 'app-announcement-bar',
  template: `
    <div appReveal [revealDelay]="400"
         class="clay-card inline-flex flex-col items-start gap-3 p-6 max-w-xs"
         style="background: linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(249, 115, 22, 0.06) 100%);">

      <div class="flex items-start gap-3 w-full">
        <span class="text-3xl flex-shrink-0">{{ ann.emoji }}</span>
        <div class="flex-1">
          <h3 class="font-bold text-sm leading-tight" style="color: #4F46E5;">
            {{ ann.title }}
          </h3>
          <p class="text-xs font-medium mt-1" style="color: #1E293B;">
            {{ ann.subtitle }}
          </p>
        </div>
      </div>

      <a [routerLink]="ann.href"
         class="w-full px-4 py-2 rounded-full font-bold text-sm transition-all duration-300
                flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105"
         style="background: linear-gradient(135deg, #4F46E5 0%, #4338CA 100%); color: white;">
        {{ ann.cta }} <lucide-icon [img]="arrowRight" size="16"></lucide-icon>
      </a>
    </div>
  `,
})
export class AnnouncementBarComponent {
  readonly ann = ANNOUNCEMENT;
  readonly arrowRight: LucideIconData = ArrowRight;
}
