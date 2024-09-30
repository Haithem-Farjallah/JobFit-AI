import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationsService } from '@core/services/applications.service';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrl: './applicants.component.css',
})
export class ApplicantsComponent {
  // applicants = [
  //   {
  //     name: 'Jake Gyll',
  //     score: 0.0,
  //     status: 'In Review',
  //     date: '13 July, 2021',
  //     image: 'assets/images/jake-gyll.png',
  //   },
  //   {
  //     name: 'Guy Hawkins',
  //     score: 0.0,
  //     status: 'In Review',
  //     date: '13 July, 2021',
  //     image: 'assets/images/guy-hawkins.png',
  //   },
  //   {
  //     name: 'Cyndy Lillibridge',
  //     score: 4.5,
  //     status: 'Shortlisted',
  //     date: '12 July, 2021',
  //     image: 'assets/images/cyndy-lillibridge.png',
  //   },
  //   {
  //     name: 'Rodolfo Goode',
  //     score: 3.75,
  //     status: 'Declined',
  //     date: '11 July, 2021',
  //     image: 'assets/images/rodolfo-goode.png',
  //   },
  //   {
  //     name: 'Leif Floyd',
  //     score: 4.8,
  //     status: 'Hired',
  //     date: '11 July, 2021',
  //     image: 'assets/images/leif-floyd.png',
  //   },
  //   {
  //     name: 'Jenny Wilson',
  //     score: 4.6,
  //     status: 'Hired',
  //     date: '9 July, 2021',
  //     image: 'assets/images/jenny-wilson.png',
  //   },
  //   {
  //     name: 'Jerome Bell',
  //     score: 4.0,
  //     status: 'Interview',
  //     date: '5 July, 2021',
  //     image: 'assets/images/jerome-bell.png',
  //   },
  //   {
  //     name: 'Eleanor Pena',
  //     score: 3.9,
  //     status: 'Declined',
  //     date: '5 July, 2021',
  //     image: 'assets/images/eleanor-pena.png',
  //   },
  // ];
  applicants: any;
  jobId!: number;
  constructor(
    private applicationService: ApplicationsService,
    private route: ActivatedRoute
  ) {
    this.route.parent?.params.subscribe((params) => {
      console.log(params);
      this.jobId = params['id'];
      this.applicationService.getApplicationsByJobId(this.jobId).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

  // Class for status badges
  getStatusClass(status: string) {
    switch (status) {
      case 'In Review':
        return 'bg-yellow-100 text-yellow-700';
      case 'Shortlisted':
        return 'bg-blue-100 text-blue-700';
      case 'Declined':
        return 'bg-red-100 text-red-700';
      case 'Hired':
        return 'bg-green-100 text-green-700';
      case 'Interview':
        return 'bg-indigo-100 text-indigo-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }
}
