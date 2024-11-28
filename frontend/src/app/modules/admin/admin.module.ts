import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { RhListComponent } from './rh-list/rh-list.component';
import { NewRhComponent } from './new-rh/new-rh.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [RhListComponent, NewRhComponent],
  imports: [CommonModule, AdminRoutingModule, MaterialModule],
})
export class AdminModule {}
