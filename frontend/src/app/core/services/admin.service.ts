import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RHList } from 'app/models/RHList.model';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getRHList(): Observable<RHList[]> {
    return this.http.get<RHList[]>(`${this.apiUrl}/admin/rh-list`);
  }
  addRHAccount(formData: RHList): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/add-rh`, formData);
  }
}
