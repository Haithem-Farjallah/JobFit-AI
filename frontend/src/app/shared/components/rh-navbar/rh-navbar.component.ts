import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { roles } from 'config/role';

@Component({
  selector: 'app-rh-navbar',
  templateUrl: './rh-navbar.component.html',
  styleUrl: './rh-navbar.component.css',
})
export class RhNavbarComponent {
  RHcontent = [
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
  AdminConent = [
    {
      label: 'RH-Dashboard',
      link: '/rh-list',
      image: '/home.png',
    },
    {
      label: 'add-employee',
      link: '/new-rh',
      image: '/home.png',
    },
  ];
  content: { label: string; link: string; image: string }[] = [];
  constructor(private authService: AuthService) {
    if (this.authService.getRole() === roles.RH) {
      this.content = this.RHcontent;
    } else if (this.authService.getRole() === roles.ADMIN) {
      this.content = this.AdminConent;
    }
  }

  logout() {
    this.authService.logout();
  }
}
