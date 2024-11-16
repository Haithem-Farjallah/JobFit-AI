import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { MaterialModule } from '../material/material.module';
import { SafePipe } from './safe-pipe.pipe';
import { AcceptButtonComponent } from 'app/shared/components/buttons/accept-button/accept-button.component';
import { RejectButtonComponent } from 'app/shared/components/buttons/reject-button/reject-button.component';

@NgModule({
  declarations: [
    ApplicationListComponent,
    ApplicationDetailsComponent,
    AcceptButtonComponent,
    RejectButtonComponent,
    SafePipe,
  ],
  imports: [CommonModule, ApplicationsRoutingModule, MaterialModule],
})
export class ApplicationsModule {}
