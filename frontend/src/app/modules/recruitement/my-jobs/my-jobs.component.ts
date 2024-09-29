import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { JobService } from '@core/services/job.service';
import { RhJobs } from 'app/models/job.model';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrl: './my-jobs.component.css',
})
export class MyJobsComponent {
  jobList: RhJobs[] = [];

  constructor(
    private jobService: JobService,
    private router: Router,
    private authService: AuthService
  ) {
    const id = this.authService.getId();
    if (!id) {
      this.router.navigate(['/auth/login']);
    } else {
      this.jobService.getRhJobs(id).subscribe({
        next: (data) => {
          this.jobList = data.jobs;
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
  formatDate(date: string | Date) {
    return new Date(date).toLocaleDateString();
  }
}
