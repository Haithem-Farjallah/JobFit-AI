import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Store } from '@ngrx/store';
import { AlertService } from 'app/shared/service/alert.service';
import { createUser } from 'app/store/user/user.actions';
import { roles } from 'config/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None, // Allow global styles
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private store: Store
  ) {}
  errorMessge = '';
  loading = false;
  handleLogin(form: NgForm) {
    if (form.valid) {
      this.loading = true;
      this.authService.login(form.value).subscribe({
        next: (data: any) => {
          console.log(data);
          this.loading = false;
          form.reset();
          if (!data.userData.activated_account) {
            this.alertService.showMessage(
              'We have sent you an email to activate your account'
            );
          } else {
            this.authService.setToken(data.token);
            const role = this.authService.getRole();
            console.log(role);
            if (role === roles.ADMIN) {
              this.router.navigate(['/rh-list']);
            } else if (role === roles.RH) {
              this.router.navigate(['/home']);
            }
            this.store.dispatch(createUser({ user: data.userData }));
          }
        },
        error: (error) => {
          this.alertService.showMessage(error.error.message);
          this.loading = false;
        },
      });
    }
  }
}
