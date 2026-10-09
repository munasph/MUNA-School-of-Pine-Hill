export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SetPasswordPayload {
  token:           string;
  password:        string;
  confirmPassword: string;
}

export interface PasswordResetPayload {
  email: string;
}

export interface PasswordResetConfirmPayload {
  token:           string;
  password:        string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?:  string;
  email?:  string;
  username?: string;
  roles?:  string[];
}

export interface AuthSession {
  token: string;
  email: string;
  username?: string;
  roles: string[];
}
