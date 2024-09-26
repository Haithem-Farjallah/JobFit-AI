import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.css',
})
export class RecoverPasswordComponent implements OnInit {
  token = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
      if (!this.token) {
        console.log('Token not found');
        this.router.navigate(['/**']);
        return;
      }
      this.authService.verifyPasswordToken(this.token).subscribe({
        error: () => {
          this.router.navigate(['/**']);
        },
      });
    });
  }

  disablePaste(event: ClipboardEvent) {
    event.preventDefault();
  }
  handleUpdatePassword(form: NgForm) {
    console.log(form.value);
    if (form.valid) {
      this.authService
        .updatePassword(form.value.password, this.token)
        .subscribe({
          next: () => {
            this.router.navigate(['/auth/login']);
          },
          error: (error) => {
            console.error(error);
          },
        });
    }
  }
}
