import { Component, inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { roles } from 'config/role';
import { Store } from '@ngrx/store';
import { selectUser } from 'app/store/user/user.selector';
import { environment } from 'environments/environment.development';

@Component({
  selector: 'app-rh-navbar',
  templateUrl: './rh-navbar.component.html',
  styleUrl: './rh-navbar.component.css',
})
export class RhNavbarComponent {
  private profilepicsUrl = environment.profilepicsUrl;

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
    // {
    //   label: 'Schedules',
    //   link: '/schedule-interview',
    //   image: '/applications.png',
    // },
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
  userData: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    image_url: string;
  } = { id: 0, firstname: '', lastname: '', email: '', image_url: '' };
  private store = inject(Store);
  private authService = inject(AuthService);
  data$ = this.store.select(selectUser);
  constructor() {
    this.setRoleContent();
    this.getAuthUserData();
  }
  //set navbar content based on role:
  setRoleContent() {
    if (this.authService.getRole() === roles.RH) {
      this.content = this.RHcontent;
    } else if (this.authService.getRole() === roles.ADMIN) {
      this.content = this.AdminConent;
    }
  }
  //get user data from store:
  getAuthUserData() {
    this.data$.subscribe((data) => {
      if (data) {
        this.userData = {
          id: data.user_id,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          image_url: this.profilepicsUrl + data.image_url,
        };
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
