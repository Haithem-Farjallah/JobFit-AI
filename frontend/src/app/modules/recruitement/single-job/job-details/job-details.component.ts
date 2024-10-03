import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '@core/services/job.service';
import { JobDetails } from 'app/models/job.model';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css',
})
export class JobDetailsComponent {
  jobDetails!: JobDetails;
  formattedExpirationDate!: string;
  constructor(private jobService: JobService, private route: ActivatedRoute) {
    this.route.data.subscribe((data) => {
      this.jobDetails = data['details'].job;
      this.formattedExpirationDate = new Date(
        this.jobDetails.expiration_date
      ).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    });
  }
}
