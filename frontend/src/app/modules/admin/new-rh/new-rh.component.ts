import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '@core/services/admin.service';
import { RHList } from 'app/models/RHList.model';
import { AlertService } from 'app/shared/service/alert.service';

@Component({
  selector: 'app-new-rh',
  templateUrl: './new-rh.component.html',
  styleUrl: './new-rh.component.css',
})
export class NewRhComponent {
  formData: RHList = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone_number: '',
  };

  constructor(
    private adminService: AdminService,
    private alertService: AlertService,
    private router: Router
  ) {}

  onSubmit() {
    this.adminService.addRHAccount(this.formData).subscribe({
      next: () => {
        this.alertService.showMessage('RH account created successfully');
        this.router.navigate(['/admin/rh-list']);
      },
      error: (err) => {
        if (err.status === 409) {
          this.alertService.showMessage('Email already exists');
          return;
        }
        this.alertService.showMessage('Error creating RH account');
      },
    });
  }
}
