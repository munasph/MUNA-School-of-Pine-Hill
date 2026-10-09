import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import type {
  AuthResponse, AuthSession, LoginCredentials,
  SetPasswordPayload, PasswordResetPayload, PasswordResetConfirmPayload,
} from '../models/auth.model';
import { apiUrl } from '../utils/api-url';

const STORAGE_KEY = 'school_admin_session';
const LAST_USERNAME_KEY = 'school_admin_last_username';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly endpoint = apiUrl('/api/auth');
  private readonly sessionSubject = new BehaviorSubject<AuthSession | null>(this.loadSession());

  readonly session$ = this.sessionSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.endpoint}/login`, credentials).pipe(
      tap((res) => {
        if (res.success && res.token && res.email) {
          const username = res.username ?? credentials.username.trim().toLowerCase();
          this.rememberUsername(username);
          this.setSession({
            token: res.token,
            email: res.email,
            username,
            roles: res.roles ?? ['ADMIN'],
          });
        }
      }),
    );
  }

  setPassword(payload: SetPasswordPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.endpoint}/set-password`, payload);
  }

  requestPasswordReset(payload: PasswordResetPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.endpoint}/password-reset`, payload);
  }

  confirmPasswordReset(payload: PasswordResetConfirmPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.endpoint}/password-reset/confirm`, payload);
  }

  logout(): void {
    sessionStorage.removeItem(STORAGE_KEY);
    this.sessionSubject.next(null);
  }

  getSession(): AuthSession | null {
    return this.sessionSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getSession()?.token;
  }

  isAdmin(): boolean {
    const roles = this.getSession()?.roles ?? [];
    return roles.some((role) => ['SUPER_ADMIN', 'ADMIN', 'EDITOR'].includes(role));
  }

  isSuperAdmin(): boolean {
    return this.getSession()?.roles.includes('SUPER_ADMIN') ?? false;
  }

  getToken(): string | null {
    return this.getSession()?.token ?? null;
  }

  getLastUsername(): string {
    return localStorage.getItem(LAST_USERNAME_KEY) ?? '';
  }

  rememberUsername(username: string): void {
    const value = username.trim().toLowerCase();
    if (value) {
      localStorage.setItem(LAST_USERNAME_KEY, value);
    }
  }

  private setSession(session: AuthSession): void {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    this.sessionSubject.next(session);
  }

  private loadSession(): AuthSession | null {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as AuthSession;
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }
  }
}
