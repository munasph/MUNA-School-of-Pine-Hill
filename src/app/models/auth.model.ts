export interface LoginCredentials {
  email:    string;
  password: string;
}

export interface SignupPayload {
  fullName:        string;
  email:           string;
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
