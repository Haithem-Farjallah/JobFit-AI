import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job, JobDetails, RhJobs } from 'app/models/job.model';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getCandidatJobs(): Observable<{ jobs: Job[] }> {
    return this.http.get<{ jobs: Job[] }>(`${this.apiUrl}/jobs`);
  }
  getJobById(id: string): Observable<{ job: JobDetails }> {
    return this.http.get<{ job: JobDetails }>(`${this.apiUrl}/jobs/${id}`);
  }
  applyJob(form: any, id: number) {
    return this.http.post(`${this.apiUrl}/jobs/${id}/applications`, form);
  }

  getRhJobs(id: number): Observable<{ jobs: RhJobs[] }> {
    return this.http.get<{ jobs: RhJobs[] }>(
      `${this.apiUrl}/jobs/rh-jobs/${id}`
    );
  }
  postJob(form: any) {
    return this.http.post(`${this.apiUrl}/jobs`, form);
  }
}
