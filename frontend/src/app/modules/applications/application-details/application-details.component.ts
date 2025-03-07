import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationsService } from '@core/services/applications.service';
import { applicationDetails } from 'app/models/applications.model';
import { environment } from 'environments/environment.development';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrl: './application-details.component.css',
})
export class ApplicationDetailsComponent {
  lables = ['Applicant Profile', 'Candidat Resume', 'AI Results'];
  applicationDetails!: applicationDetails;
  currentTab = 0;
  loading: boolean = true;
  private pdf_url = environment.pdfUrl;
  id!: number;
  constructor(
    private applicationService: ApplicationsService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    const savedTab = localStorage.getItem('currentTab');
    if (savedTab !== null) {
      this.currentTab = +savedTab; // '+' converts string to number
    }

    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.applicationService.getSingleApplication(this.id)?.subscribe({
      next: (data) => {
        this.applicationDetails = data;
        this.setPdfUrl(data.resume_url);
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
      },
    });
  }
  setPdfUrl(url: string) {
    this.pdf_url = this.pdf_url + url;
  }
  getPdfUrl(): string {
    return this.pdf_url;
  }
  changeTab(index: number) {
    this.currentTab = index;
    localStorage.setItem('currentTab', index.toString());
  }
  goback() {
    this.location.back();
  }
  handleReject() {
    this.applicationService.rejectApplication(this.id).subscribe({
      next: (data) => {
        console.log(data);
        this.goback();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  handleInterview() {
    this.router.navigate(['/schedule-interview']);
  }
}
