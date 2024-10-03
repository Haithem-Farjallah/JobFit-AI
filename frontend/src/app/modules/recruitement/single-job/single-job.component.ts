import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-job',
  templateUrl: './single-job.component.html',
  styleUrl: './single-job.component.css',
})
export class SingleJobComponent {
  queryData!: {
    experience_level: string;
    job_title: string;
    work_type: string;
  };
  id!: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.route.queryParams.subscribe((params) => {
      if (
        !params['experience_level'] ||
        !params['job_title'] ||
        !params['work_type']
      ) {
        this.router.navigate(['/home']);
      }
      this.queryData = {
        experience_level: params['experience_level'],
        job_title: params['job_title'],
        work_type: params['work_type'],
      };
    });
  }
  goback() {
    this.location.back();
  }
}
