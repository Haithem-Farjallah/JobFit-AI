import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecruitementRoutingModule } from './recruitement-routing.module';
import { JobPostingComponent } from './job-posting/job-posting.component';
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { JobApplicationsComponent } from './job-applications/job-applications.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    JobPostingComponent,
    MyJobsComponent,
    JobApplicationsComponent,
  ],
  imports: [
    CommonModule,
    RecruitementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    MaterialModule,
  ],
})
export class RecruitementModule {}
