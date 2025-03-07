import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { profileDetailsResolver } from '@core/resolvers/profile-details.resolver';

const routes: Routes = [
  {
    path: ':id',
    component: UserProfileComponent,
    resolve: { details: profileDetailsResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
