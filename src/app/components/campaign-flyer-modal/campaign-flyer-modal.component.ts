import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { X, LucideIconData } from 'lucide-angular';
import { CampaignFlyerService } from '../../services/campaign-flyer.service';

@Component({
  selector: 'app-campaign-flyer-modal',
  templateUrl: './campaign-flyer-modal.component.html',
  styleUrls: ['./campaign-flyer-modal.component.css'],
})
export class CampaignFlyerModalComponent implements OnInit, OnDestroy {
  readonly closeIcon: LucideIconData = X;
  readonly campaign = this.flyerService.campaign;
  open = false;
  imageViewerOpen = false;

  private subs = new Subscription();

  constructor(private readonly flyerService: CampaignFlyerService) {}

  ngOnInit(): void {
    this.subs.add(
      this.flyerService.open$.subscribe((open) => {
        this.open = open;
        if (!open) {
          this.imageViewerOpen = false;
        }
      }),
    );
    this.flyerService.maybeAutoOpen();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.imageViewerOpen) {
      this.closeImageViewer();
      return;
    }
    if (this.open) {
      this.dismiss();
    }
  }

  openImageViewer(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.imageViewerOpen = true;
  }

  closeImageViewer(): void {
    this.imageViewerOpen = false;
  }

  dismiss(): void {
    this.imageViewerOpen = false;
    this.flyerService.dismiss();
  }
}
