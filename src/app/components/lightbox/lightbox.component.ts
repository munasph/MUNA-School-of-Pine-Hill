import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ChevronLeft, ChevronRight, X, LucideIconData } from 'lucide-angular';
import type { GalleryImage } from '../../lib/types';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.css'],
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
