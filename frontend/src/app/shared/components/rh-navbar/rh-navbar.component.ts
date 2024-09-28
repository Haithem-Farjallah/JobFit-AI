import { Component } from '@angular/core';

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
      link: '/home',
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
  ];
}
