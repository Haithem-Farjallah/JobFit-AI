import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { RhListComponent } from './rh-list/rh-list.component';
import { NewRhComponent } from './new-rh/new-rh.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/modules/shared/shared.module';

@NgModule({
  declarations: [RhListComponent, NewRhComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule,
  ],
})
export class AdminModule {}
