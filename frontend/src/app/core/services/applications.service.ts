import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from './auth.service';
import {
  applicantsPerJob,
  Application,
  applicationDetails,
} from 'app/models/applications.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  private apiUrl = environment.apiUrl;

  private getId(): number | null {
    const token = this.authService.getToken();
    if (token) {
      const decoded = jwtDecode<{ id: number; iat: number; exp: number }>(
        token
      );
      return decoded.id;
    }
    return null;
  }
  getApplications(
    limit: number,
    offset: number
  ): Observable<Application[]> | null {
    const id = this.getId();
    if (!id) return null;
    return this.http.get<Application[]>(
      `${this.apiUrl}/applications/${id}?limit=${limit}&offset=${offset}`
    );
  }
  getSingleApplication(id: number): Observable<applicationDetails> | null {
    return this.http.get<applicationDetails>(
      `${this.apiUrl}/applications/single/${id}`
    );
  }

  getApplicationsByJobId(id: number): Observable<applicantsPerJob[]> {
    return this.http.get<applicantsPerJob[]>(
      `${this.apiUrl}/applications/job/${id}`
    );
  }
}
