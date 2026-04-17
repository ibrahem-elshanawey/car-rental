export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone: string;
  country: string;  
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'customer';
   phone: string;
    country: string;
    wallet: number | null;
}