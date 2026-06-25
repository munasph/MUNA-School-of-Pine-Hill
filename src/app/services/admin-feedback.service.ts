import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AdminFeedbackType = 'success' | 'error';

export interface AdminFeedback {
  type:    AdminFeedbackType;
  title:   string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class AdminFeedbackService {
  private readonly subject = new BehaviorSubject<AdminFeedback | null>(null);
  readonly feedback$ = this.subject.asObservable();

  private hideTimer: ReturnType<typeof setTimeout> | null = null;

  showSuccess(message: string, title = 'Changes saved'): void {
    this.show('success', title, message);
  }

  showError(message: string, title = 'Could not save'): void {
    this.show('error', title, message);
  }

  dismiss(): void {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
    this.subject.next(null);
  }

  private show(type: AdminFeedbackType, title: string, message: string): void {
    this.dismiss();
    this.subject.next({ type, title, message });
    this.hideTimer = setTimeout(() => this.dismiss(), 5000);
  }
}
