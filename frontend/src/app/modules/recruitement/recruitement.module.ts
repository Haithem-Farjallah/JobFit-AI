import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

import { RecruitementRoutingModule } from './recruitement-routing.module';
import { JobPostingComponent } from './job-posting/job-posting.component';
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { JobApplicationsComponent } from './job-applications/job-applications.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SingleJobComponent } from './single-job/single-job.component';
import { ApplicantsComponent } from './single-job/applicants/applicants.component';
import { JobDetailsComponent } from './single-job/job-details/job-details.component';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    JobPostingComponent,
    MyJobsComponent,
    JobApplicationsComponent,
    SingleJobComponent,
    ApplicantsComponent,
    JobDetailsComponent,
    HomeComponent,
    CalendarComponent,
  ],
  imports: [
    CommonModule,
    RecruitementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    MaterialModule,
    FullCalendarModule,
    NgChartsModule,
  ],
})
export class RecruitementModule {}
