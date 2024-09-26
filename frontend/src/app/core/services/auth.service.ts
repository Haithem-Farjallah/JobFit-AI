import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;
  login(data: any) {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }
  register(data: any) {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }
  recoverPassword(data: any) {
    return this.http.post(`${this.apiUrl}/auth/forgot-password`, data);
  }

  getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    // Optionally handle SSR cases
    return null; // Or a different fallback
  }

  setToken(token: string) {
    localStorage.setItem('access_token', token);
  }
  logout() {
    localStorage.removeItem('access_token');
  }
  isAuthenticated() {
    return !!this.getToken();
  }

  activateAccount(token: string) {
    return this.http.get(
      `${this.apiUrl}/users/activate-account?token=${token}`
    );
  }
  verifyPasswordToken(token: string) {
    return this.http.get(`${this.apiUrl}/users/reset-password?token=${token}`);
  }
  updatePassword(password: string, token: string) {
    return this.http.post(
      `${this.apiUrl}/users/reset-password?token=${token}`,
      { password }
    );
  }
}
