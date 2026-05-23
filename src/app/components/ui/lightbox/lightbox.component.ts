import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ChevronLeft, ChevronRight, X, LucideIconData } from 'lucide-angular';
import type { GalleryImage } from '../../../lib/types';

@Component({
  selector: 'app-lightbox',
  template: `
    <div *ngIf="selectedIndex !== null"
         class="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
         (click)="onClose()"
         tabindex="0">

      <button class="absolute top-5 right-5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors"
              type="button"
              aria-label="Close"
              (click)="onClose(); $event.stopPropagation()">
        <lucide-icon [img]="x" size="22"></lucide-icon>
      </button>

      <button class="absolute top-1/2 left-2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
              type="button"
              aria-label="Previous image"
              (click)="prev.emit(); $event.stopPropagation()">
        <lucide-icon [img]="chevronLeft" size="24"></lucide-icon>
      </button>

      <button class="absolute top-1/2 right-2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
              type="button"
              aria-label="Next image"
              (click)="next.emit(); $event.stopPropagation()">
        <lucide-icon [img]="chevronRight" size="24"></lucide-icon>
      </button>

      <div class="flex flex-col items-center gap-3" (click)="$event.stopPropagation()">
        <img *ngIf="image"
             [src]="image.src"
             [alt]="image.label"
             class="max-w-[90vw] max-h-[80vh] rounded-2xl object-contain shadow-2xl" />
        <span *ngIf="image" class="text-white/80 text-sm font-bold">{{ image.label }}</span>
      </div>
    </div>
  `,
})
export class LightboxComponent {
  @Input() images: GalleryImage[] = [];
  @Input() selectedIndex: number | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() prev  = new EventEmitter<void>();
  @Output() next  = new EventEmitter<void>();

  readonly chevronLeft:  LucideIconData = ChevronLeft;
  readonly chevronRight: LucideIconData = ChevronRight;
  readonly x:            LucideIconData = X;

  get image(): GalleryImage | undefined {
    return this.selectedIndex !== null ? this.images[this.selectedIndex] : undefined;
  }

  onClose(): void {
    this.close.emit();
  }

  @HostListener('window:keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    if (this.selectedIndex === null) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); this.next.emit(); }
    else if (e.key === 'ArrowLeft')  { e.preventDefault(); this.prev.emit(); }
    else if (e.key === 'Escape')     { e.preventDefault(); this.close.emit(); }
  }
}
