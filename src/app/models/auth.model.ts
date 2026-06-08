export interface LoginCredentials {
  email:    string;
  password: string;
}

export interface SignupPayload {
  fullName:        string;
  email:           string;
  password:        string;
  confirmPassword: string;
  role?:           'ADMIN' | 'EDITOR';
}

export interface StaffSignupPayload extends SignupPayload {
  role: 'ADMIN' | 'EDITOR';
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
  roles?:  string[];
}

export interface AuthSession {
  token: string;
  email: string;
  roles: string[];
}
