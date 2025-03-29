import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationsService } from '@core/services/applications.service';
import { Store } from '@ngrx/store';
import { AuthUser } from 'app/models/authUser.model';
import { AppState } from 'app/store/app.state';
import { selectUser } from 'app/store/user/user.selector';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnDestroy {
  user: AuthUser | null = null;
  pendingReviews: number = 0;
  private subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private applicationService: ApplicationsService
  ) {
    this.subscription = this.store.select(selectUser).subscribe((user) => {
      this.user = user;
    });
    this.applicationService
      .getPendingApplicationCount(this.user?.user_id!)
      .subscribe({
        next: (data) => {
          this.pendingReviews = data;
          console.log(this.pendingReviews);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
