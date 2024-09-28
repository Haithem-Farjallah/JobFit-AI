import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.css',
})
export class ActivateAccountComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}
  token = '';
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
      if (!this.token) {
        console.log('Token not found');
        this.router.navigate(['/**']);
        return;
      }
    });
    this.authService.activateAccount(this.token).subscribe({
      next: (response) => {
        console.log(response);
        console.log('**************************');
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        console.error(error.error.message);
        this.router.navigate(['/**']);
      },
    });
  }
}
