import { Component } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-rh-navbar',
  templateUrl: './rh-navbar.component.html',
  styleUrl: './rh-navbar.component.css',
})
export class RhNavbarComponent {
  content = [
    {
      label: 'Home',
      link: '/home',
      image: '/home.png',
    },
    {
      label: 'Post a job',
      link: '/post-job',
      image: '/postJob.png',
    },
    {
      label: 'My Jobs',
      link: '/job-listing',
      image: '/alljobs.png',
    },
    {
      label: 'All Applications',
      link: '/applications',
      image: '/applications.png',
    },
    {
      label: 'Schedules',
      link: '/schedule-interview',
      image: '/applications.png',
    },
  ];
  constructor(private authService: AuthService) {}
  logout() {
    this.authService.logout();
  }
}
