import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { authGuard } from '@core/guards/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'jobs',
        loadChildren: () =>
          import('./modules/jobs/jobs.module').then((m) => m.JobsModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./modules/user/user.module').then((m) => m.UserModule),
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
