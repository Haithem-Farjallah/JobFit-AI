import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [ApplicationListComponent, ApplicationDetailsComponent],
  imports: [CommonModule, ApplicationsRoutingModule, MaterialModule],
})
export class ApplicationsModule {}
