import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobDetailsResolver } from '@core/resolvers/jobDetailsResolver.service';
const routes: Routes = [
  {
    path: '',
    component: JobListComponent,
  },
  {
    path: ':id',
    component: JobDetailsComponent,
    resolve: { details: JobDetailsResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsRoutingModule {}
