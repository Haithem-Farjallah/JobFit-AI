import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    EditProfileComponent,
    ProfileDetailsComponent,
    ProfileHeaderComponent,
  ],
  imports: [CommonModule, ProfileRoutingModule],
})
export class ProfileModule {}
