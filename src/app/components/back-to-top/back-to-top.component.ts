import { Component, HostListener } from '@angular/core';
import { ChevronUp, LucideIconData } from 'lucide-angular';

@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.css'],
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
