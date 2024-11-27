import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RhListComponent } from './rh-list/rh-list.component';
import { NewRhComponent } from './new-rh/new-rh.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'rh-list',
    pathMatch: 'full',
  },
  {
    path: 'rh-list',
    component: RhListComponent,
  },
  {
    path: 'new-rh',
    component: NewRhComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
