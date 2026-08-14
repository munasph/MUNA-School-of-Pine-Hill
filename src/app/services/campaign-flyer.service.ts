import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HOME_COPY } from '../components/home/home.data';

@Injectable({ providedIn: 'root' })
export class CampaignFlyerService {
  readonly campaign = HOME_COPY.campaign;
  private readonly openSubject = new BehaviorSubject<boolean>(false);
  readonly open$ = this.openSubject.asObservable();

  get isOpen(): boolean {
    return this.openSubject.value;
  }

  /** Auto-open on every public page visit/reload while the campaign is enabled. */
  maybeAutoOpen(): void {
    if (!this.campaign.enabled) return;
    window.setTimeout(() => this.open(), 700);
  }

  open(): void {
    if (!this.campaign.enabled) return;
    this.openSubject.next(true);
    document.body.style.overflow = 'hidden';
  }

  dismiss(): void {
    this.openSubject.next(false);
    document.body.style.overflow = '';
  }
}
