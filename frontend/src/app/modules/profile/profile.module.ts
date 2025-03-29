import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/modules/shared/shared.module';

@NgModule({
  declarations: [
    UserProfileComponent,
    EditProfileComponent,
    ProfileHeaderComponent,
  ],
  imports: [CommonModule, ProfileRoutingModule, FormsModule, SharedModule],
})
export class ProfileModule {}
