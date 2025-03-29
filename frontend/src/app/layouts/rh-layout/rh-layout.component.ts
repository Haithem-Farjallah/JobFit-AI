import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from 'app/store/user/user.selector';
import { environment } from 'environments/environment.development';

@Component({
  selector: 'app-rh-layout',
  templateUrl: './rh-layout.component.html',
  styleUrl: './rh-layout.component.css',
})
export class RhLayoutComponent {
  private profilepicsUrl = environment.profilepicsUrl;
  userData: {
    firstname: string;
    lastname: string;
    email: string;
    image_url: string;
  } = { firstname: '', lastname: '', email: '', image_url: '' };
  private store = inject(Store);
  data$ = this.store.select(selectUser);
  constructor() {
    this.data$.subscribe((data) => {
      if (data) {
        this.userData = {
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          image_url: this.profilepicsUrl + data.image_url,
        };
      }
    });
  }
}
