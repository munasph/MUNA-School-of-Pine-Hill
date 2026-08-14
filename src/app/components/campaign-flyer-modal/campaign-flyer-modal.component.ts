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

  private subs = new Subscription();

  constructor(private readonly flyerService: CampaignFlyerService) {}

  ngOnInit(): void {
    this.subs.add(this.flyerService.open$.subscribe((open) => (this.open = open)));
    this.flyerService.maybeAutoOpen();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open) {
      this.dismiss();
    }
  }

  dismiss(): void {
    this.flyerService.dismiss();
  }
}
