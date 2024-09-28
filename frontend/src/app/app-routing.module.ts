import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './layouts/candidatLayout/layouts.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { RhLayoutComponent } from './layouts/rh-layout/rh-layout.component';
import { authGuard } from '@core/guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'jobs',
    pathMatch: 'full',
  },

  {
    path: '',
    component: LayoutsComponent,
    children: [
      {
        //accessible by candidats
        path: 'jobs',
        loadChildren: () =>
          import('./modules/jobs/jobs.module').then((m) => m.JobsModule),
      },
    ],
  },
  {
    path: '',
    component: RhLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        //for rh only
        path: 'applications',
        loadChildren: () =>
          import('./modules/applications/applications.module').then(
            (m) => m.ApplicationsModule
          ),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
