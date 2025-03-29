import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { Store } from '@ngrx/store';
import { AlertService } from 'app/shared/service/alert.service';
import { updateUser } from 'app/store/user/user.actions';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  route = inject(ActivatedRoute);
  userService = inject(UserService);
  alertService = inject(AlertService);
  store = inject(Store);
  data: any;
  isFormVisible = false;
  constructor() {
    this.getData();
  }

  getData() {
    this.route.data.subscribe((data) => {
      this.data = data['details'];
      console.log(data);
    });
  }

  showForm() {
    this.isFormVisible = true;
  }

  hideForm() {
    this.isFormVisible = false;
  }

  onFormSubmit(formData: any) {
    this.userService.updateUser(formData).subscribe({
      next: () => {
        this.alertService.showMessage('Profile updated successfully');
        this.route.params.subscribe((params) => {
          const id = params['id'];
          this.userService.getUserDetails(id).subscribe({
            next: (data) => {
              this.data = data;
              this.store.dispatch(updateUser({ user: data }));
            },
          });
        });
      },
      error: () => {
        this.alertService.showMessage(
          'An error occurred while updating profile'
        );
      },
    });
    this.hideForm();
  }
}
