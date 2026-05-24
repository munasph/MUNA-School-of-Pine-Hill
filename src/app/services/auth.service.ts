import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from 'rxjs';

import type { AuthResponse, LoginCredentials, SignupPayload } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly endpoint = '/api/auth';

  constructor(private readonly http: HttpClient) {}

  /**
   * Authenticate a user.
   *
   * Swap to `return this.http.post<AuthResponse>(\`${this.endpoint}/login\`, credentials);`
   * when Spring Boot is ready.
   */
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    void credentials;
    return of<AuthResponse>({
      success: true,
      message: 'Login successful. Connect to your backend to enable real authentication.',
    }).pipe(delay(600));
  }

  /**
   * Register a new user.
   *
   * Swap to `return this.http.post<AuthResponse>(\`${this.endpoint}/signup\`, payload);`
   * when Spring Boot is ready.
   */
  signup(payload: SignupPayload): Observable<AuthResponse> {
    void payload;
    return of<AuthResponse>({
      success: true,
      message: 'Account created. Connect to your backend to enable real registration.',
    }).pipe(delay(600));
  }
}
