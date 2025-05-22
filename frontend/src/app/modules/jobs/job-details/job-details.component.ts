import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '@core/services/job.service';
import { JobDetails } from 'app/models/job.model';
import { AlertService } from 'app/shared/service/alert.service';
import { environment } from 'environments/environment.development';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css',
})
export class JobDetailsComponent implements OnInit {
  profilepicsUrl = environment.profilepicsUrl;
  selectedFile: File | null = null;
  invalidFile: boolean = false;
  additionalInfo: string = '';
  jobDetails!: JobDetails;
  overview!: { title: string; value: string; image: string }[];
  formattedExpirationDate!: string;
  apply: boolean = false;
  jobId!: number;
  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.jobId = params['id'];
    });
    this.route.data.subscribe((data) => {
      this.jobDetails = data['details'].job;
      this.jobDetails = {
        ...this.jobDetails,
        image_url: this.profilepicsUrl + this.jobDetails.image_url,
      };
      this.formattedExpirationDate = this.dateFormat(
        this.jobDetails.expiration_date
      );
      this.overview = [
        {
          title: 'Job posted',
          value: this.dateFormat(this.jobDetails.created_at),
          image: '/CalendarBlank.png',
        },
        {
          title: 'Expiration Date',
          value: this.formattedExpirationDate,
          image: '/Timer.png',
        },
        {
          title: 'Experience Level',
          value: this.jobDetails.experience_level,
          image: '/briefcase.png',
        },
        {
          title: 'Work Type',
          value: this.jobDetails.work_type,
          image: '/Map.png',
        },
        {
          title: 'Salary',
          value:
            this.jobDetails.min_salary && this.jobDetails.max_salary
              ? `${this.jobDetails.min_salary} - ${this.jobDetails.max_salary}`
              : 'Not specified',
          image: '/Wallet.png',
        },
      ];
    });
  }
  dateFormat(date: string | Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
  openApplication() {
    this.apply = true;
    this.disableScroll();
  }

  closeApplication() {
    this.apply = false;
    this.enableScroll();
  }

  private disableScroll() {
    document.body.style.overflow = 'hidden';
  }

  private enableScroll() {
    document.body.style.overflow = 'auto';
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
      this.invalidFile = false;
      return;
    }
    this.selectedFile = null;
    this.invalidFile = true;
  }
  onInput(event: any): void {
    this.additionalInfo = event.target.value;
  }

  shareOnFacebook() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.origin + this.router.url
    )}`;
    console.log(url);
    window.open(url, '_blank');
  }

  shareOnLinkedIn() {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      window.location.origin + this.router.url
    )}`;
    window.open(url, '_blank');
  }

  handleSubmit(form: NgForm) {
    const formData = new FormData();
    formData.append('firstname', form.value.firstName);
    formData.append('lastname', form.value.lastName);
    formData.append('email', form.value.email);
    formData.append('phone_number', form.value.phone);
    formData.append('candidat_note', form.value.candidat_note);
    formData.append('linkedin_url', form.value.linkedin_url);
    if (this.selectedFile) {
      formData.append('resume', this.selectedFile);
    }
    this.jobService.applyJob(formData, this.jobId).subscribe({
      next: () => {
        this.alertService.showMessage('Application submitted successfully');
        this.closeApplication();
      },
      error: (error) => {
        if (error.status == 403) {
          this.alertService.showMessage(error.error.message);
          return;
        }
        this.alertService.showMessage('something went wrong, please try again');
      },
    });
  }
}
