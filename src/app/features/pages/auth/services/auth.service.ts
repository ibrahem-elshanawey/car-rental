import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../models/auth.model';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient,private router:Router) {}

  // ── Customer ─────────────────────────────────────────
  login(data: LoginRequest) {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/customer/login`, data)
      .pipe(tap(res => this.saveSession(res)));
  }

  register(data: RegisterRequest) {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/customer/register`, data)
      .pipe(tap(res => this.saveSession(res)));
  }

  // ── Admin ─────────────────────────────────────────────
  adminLogin(data: LoginRequest) {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/admin/login`, data)
      .pipe(tap(res => this.saveSession(res)));
  }
// ── Get current user from API ──────────────────────────
  getMe() {
    return this.http
      .get<User>(`${this.baseUrl}/customer/me`)
      .pipe(
        tap(user => {
          // Update stored user with fresh data from API
          localStorage.setItem('user', JSON.stringify(user));
        })
      );
  }

  // ── Get stored user from localStorage ─────────────────
  getCurrentUser(): User | null {
    const raw = localStorage.getItem('user');
    if (!raw || raw === 'undefined') return null;

  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
  }
  // ── Shared ────────────────────────────────────────────
  private saveSession(res: AuthResponse): void {
    localStorage.setItem('token', res.token);
    localStorage.setItem('role', res.user.role);
    localStorage.setItem('user', JSON.stringify(res.user)); // store full user
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getToken(): string | null { return localStorage.getItem('token'); }
  getRole(): string | null  { return localStorage.getItem('role'); }
  isLoggedIn(): boolean     { return !!this.getToken(); }
  isAdmin(): boolean        { return this.getRole() === 'admin'; }
  isCustomer(): boolean     { return this.getRole() === 'customer'; }
}
