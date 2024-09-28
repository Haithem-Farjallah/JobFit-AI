import { Component } from '@angular/core';
import { JobService } from '@core/services/job.service';
import { Job } from 'app/models/job.model';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css',
})
export class JobListComponent {
  jobs!: Job[];

  changeArrow = false;
  constructor(private jobService: JobService) {
    this.getCandidatJobs();
  }
  getCandidatJobs() {
    this.jobService.getCandidatJobs().subscribe({
      next: (response: { jobs: Job[] }) => {
        this.jobs = response.jobs;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  getDaysAgo(date: string) {
    const today = new Date();
    const expirationDate = new Date(date);
    const diffTime = expirationDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}
