import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl;
  getUserDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${id}`);
  }
  updateUser(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users`, data);
  }
}
