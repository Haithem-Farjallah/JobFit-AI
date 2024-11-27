import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

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

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  setToken(token: string) {
    localStorage.setItem('access_token', token);
  }
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('currentTab');
    this.router.navigate(['/auth/login']);
  }
  isAuthenticated(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.apiUrl}/auth/verifyJwt`, {
      observe: 'response',
    });
  }

  getId(): number | null {
    const token = this.getToken();
    if (token) {
      const decoded = jwtDecode<{
        id: number;
        role: string;
        iat: number;
        exp: number;
      }>(token);
      return decoded.id;
    }
    return null;
  }
  getRole(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const decoded = jwtDecode<{
      id: number;
      role: string;
      iat: number;
      exp: number;
    }>(token);
    console.log(decoded);
    return decoded.role;
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
