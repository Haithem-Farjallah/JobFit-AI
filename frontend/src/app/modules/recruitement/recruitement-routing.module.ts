import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { JobApplicationsComponent } from './job-applications/job-applications.component';
import { JobPostingComponent } from './job-posting/job-posting.component';

const routes: Routes = [
  {
    path: 'job-listing',
    component: MyJobsComponent,
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
