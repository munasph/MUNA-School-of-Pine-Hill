import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { HOME_COPY } from '../components/home/home.data';
import { SchoolInfoService } from './school-info.service';

@Injectable({ providedIn: 'root' })
export class CampaignFlyerService implements OnDestroy {
  readonly campaign = HOME_COPY.campaign;
  private readonly openSubject = new BehaviorSubject<boolean>(false);
  readonly open$ = this.openSubject.asObservable();
  private readonly subs = new Subscription();
  private autoOpenScheduled = false;

  constructor(private readonly schoolInfo: SchoolInfoService) {
    this.subs.add(
      this.schoolInfo.schoolInfo$.subscribe((info) => {
        if (!info.campaignFlyerEnabled && this.isOpen) {
          this.dismiss();
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  get isOpen(): boolean {
    return this.openSubject.value;
  }

  get isEnabled(): boolean {
    return this.schoolInfo.snapshot.campaignFlyerEnabled !== false;
  }

  /** Auto-open on every public page visit/reload while enabled in Admin → Settings. */
  maybeAutoOpen(): void {
    if (this.autoOpenScheduled) return;
    this.autoOpenScheduled = true;
    window.setTimeout(() => {
      if (this.isEnabled) {
        this.open();
      }
    }, 700);
  }

  open(): void {
    if (!this.isEnabled) return;
    this.openSubject.next(true);
    document.body.style.overflow = 'hidden';
  }

  dismiss(): void {
    this.openSubject.next(false);
    document.body.style.overflow = '';
  }
}
