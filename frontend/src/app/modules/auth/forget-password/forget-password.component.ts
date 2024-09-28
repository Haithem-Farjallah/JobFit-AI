import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@core/services/auth.service';
import { AlertService } from 'app/shared/service/alert.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  constructor(
    private authService: AuthService,
    private alertService: AlertService
  ) {}
  errorMessge = '';
  loading = false;
  handleRecoverPassword(form: NgForm) {
    if (form.valid) {
      this.authService.recoverPassword(form.value).subscribe({
        next: () => {
          this.loading = false;
          this.alertService.showMessage(
            'an email has been sent with your link to recover password'
          );
        },
        error: (error) => {
          this.errorMessge = error.error.message;
          console.error(error);
        },
      });
    }
  }
}
