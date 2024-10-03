import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  ELEMENT_DATA: {
    id: number;
    fullName: string;
    hiring_stage: string;
    score: string;
    created_at: string;
    link: string;
  }[] = [];
  dataSource = new MatTableDataSource<{
    id: number;
    fullName: string;
    hiring_stage: string;
    score: string;
    created_at: string;
    link: string;
  }>();
  constructor(
    private applicationService: ApplicationsService,
    private route: ActivatedRoute
  ) {
    this.route.parent?.params.subscribe((params) => {
      this.jobId = params['id'];
      this.applicationService.getApplicationsByJobId(this.jobId).subscribe({
        next: (data) => {
          this.ELEMENT_DATA = data.map((app) => ({
            id: app.id,
            fullName: `${app.firstname} ${app.lastname}`,
            hiring_stage: app.hiring_stage,
            score: app.score,
            created_at: new Date(app.created_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
            link: `/applications/${app.id}`,
          }));
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }
  private _liveAnnouncer = inject(LiveAnnouncer);

  displayedColumns: string[] = [
    'fullName',
    'score',
    'hiring_stage',
    'created_at',
    'link',
  ]; // Ensure these match the matColumnDef

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
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
