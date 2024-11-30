import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './layouts/candidatLayout/layouts.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { RhLayoutComponent } from './layouts/rh-layout/rh-layout.component';
import { authGuard } from '@core/guards/auth.guard';
import { candidatGuard } from '@core/guards/candidat.guard';
import { rhGuard } from '@core/guards/role/rh.guard';
import { adminGuard } from '@core/guards/role/admin.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'jobs',
    pathMatch: 'full',
  },

  {
    path: '',
    component: LayoutsComponent,
    canActivate: [candidatGuard],
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
        path: '',
        canActivate: [rhGuard],
        loadChildren: () =>
          import('./modules/applications/applications.module').then(
            (m) => m.ApplicationsModule
          ),
      },
      {
        path: '',
        canActivate: [rhGuard],
        loadChildren: () =>
          import('./modules/recruitement/recruitement.module').then(
            (m) => m.RecruitementModule
          ),
      },
      {
        //for admin
        path: '',
        canActivate: [adminGuard],
        loadChildren: () =>
          import('./modules/admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'profile',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./modules/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
