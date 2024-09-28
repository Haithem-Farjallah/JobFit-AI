import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { AlertService } from 'app/shared/service/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}
  errorMessge = '';
  loading = false;
  handleRegister(form: NgForm) {
    if (form.valid) {
      console.log(form.value);
      this.loading = true;
      this.authService.register(form.value).subscribe({
        next: (response) => {
          console.log(response);
          this.loading = false;
          this.router.navigate(['/login']);
        },
        error: (error) => {
          if (error.status === 409) {
            this.errorMessge = error.error.message;
          } else {
            this.errorMessge = 'Something went wrong';
          }
          this.alertService.showMessage(this.errorMessge);
          this.loading = false;
        },
      });
    }
  }
}
