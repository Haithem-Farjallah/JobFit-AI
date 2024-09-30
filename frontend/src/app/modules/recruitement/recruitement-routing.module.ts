import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { JobApplicationsComponent } from './job-applications/job-applications.component';
import { JobPostingComponent } from './job-posting/job-posting.component';
import { SingleJobComponent } from './single-job/single-job.component';
import { ApplicantsComponent } from './single-job/applicants/applicants.component';
import { JobDetailsComponent } from './single-job/job-details/job-details.component';

const routes: Routes = [
  {
    path: 'job-listing',
    component: MyJobsComponent,
  },
  {
    path: 'job-listing/:id',
    component: SingleJobComponent,
    children: [
      {
        path: '',
        redirectTo: 'applicants',
        pathMatch: 'full',
      },
      {
        path: 'applicants',
        component: ApplicantsComponent,
      },
      {
        path: 'details',
        component: JobDetailsComponent,
      },
    ],
  },
  {
    path: 'applicatants-Table',
    component: JobApplicationsComponent,
  },
  {
    path: 'post-job',
    component: JobPostingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecruitementRoutingModule {}
