import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, tap } from 'rxjs';

import type {
  PortalLoginCredentials, PortalSession, PortalSignupPayload,
} from '../models/portal-auth.model';

const STORAGE_KEY = 'school_portal_session';

/**
 * Placeholder family-portal auth (client-only).
 * Replace with real API + JWT when grades portal is implemented.
 */
@Injectable({ providedIn: 'root' })
export class PortalAuthService {
  private readonly sessionSubject = new BehaviorSubject<PortalSession | null>(this.loadSession());

  readonly session$ = this.sessionSubject.asObservable();

  login(credentials: PortalLoginCredentials): Observable<PortalSession> {
    const session = this.buildSession(credentials.email, 'Parent / Guardian');
    return of(session).pipe(
      delay(400),
      tap((s) => this.setSession(s)),
    );
  }

  signup(payload: PortalSignupPayload): Observable<PortalSession> {
    const label = payload.role === 'STUDENT' ? 'Student' : 'Parent / Guardian';
    const session = this.buildSession(payload.email, payload.fullName, payload.role, label);
    return of(session).pipe(
      delay(500),
      tap((s) => this.setSession(s)),
    );
  }

  logout(): void {
    sessionStorage.removeItem(STORAGE_KEY);
    this.sessionSubject.next(null);
  }

  getSession(): PortalSession | null {
    return this.sessionSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getSession()?.token;
  }

  private buildSession(
    email: string,
    fullName: string,
    role: PortalSession['role'] = 'PARENT',
    studentName = 'Demo Student',
  ): PortalSession {
    return {
      token: `portal-demo-${Date.now()}`,
      email,
      fullName,
      role,
      studentName,
    };
  }

  private setSession(session: PortalSession): void {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    this.sessionSubject.next(session);
  }

  private loadSession(): PortalSession | null {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as PortalSession;
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }
  }
}
