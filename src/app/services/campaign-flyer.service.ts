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

  maybeAutoOpen(): void {
    if (!this.campaign.enabled || this.isDismissed()) return;
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
    try {
      sessionStorage.setItem(this.campaign.storageKey, '1');
    } catch {
      // Ignore storage failures in private browsing.
    }
  }

  private isDismissed(): boolean {
    try {
      return sessionStorage.getItem(this.campaign.storageKey) === '1';
    } catch {
      return false;
    }
  }
}
