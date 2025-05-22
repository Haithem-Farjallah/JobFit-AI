import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationsService } from '@core/services/applications.service';
import { Store } from '@ngrx/store';
import { AuthUser } from 'app/models/authUser.model';
import { AppState } from 'app/store/app.state';
import { selectUser } from 'app/store/user/user.selector';
import { Subscription } from 'rxjs';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { JobService } from '@core/services/job.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnDestroy {
  user: AuthUser | null = null;
  pendingReviews = 0;
  acceptedReviews = 0;
  rejectedReviews = 0;
  private subscription: Subscription = new Subscription();

  jobStats: { title: string; application_count: number }[] = [];

  // Chart Configuration
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Candidates per Job Title',
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
    },
  };

  public barChartType: ChartType = 'bar';
  public barChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Number of Candidates',
        data: [],
        backgroundColor: '#6366F1',
        borderRadius: 6,
      },
    ],
  };

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private applicationService: ApplicationsService,
    private jobService: JobService
  ) {
    this.subscription = this.store.select(selectUser).subscribe((user) => {
      this.user = user;
      if (this.user?.user_id) {
        this.fetchData(this.user.user_id);
      }
    });
  }

  fetchData(userId: number) {
    this.applicationService.getPendingApplicationCount(userId).subscribe({
      next: (data) => (this.pendingReviews = data),
      error: (error) => console.error(error),
    });

    this.applicationService.getAcceptedApplicationCount(userId).subscribe({
      next: (data) => (this.acceptedReviews = data),
      error: (error) => console.error(error),
    });

    this.applicationService.getRejectedApplicationCount(userId).subscribe({
      next: (data) => (this.rejectedReviews = data),
      error: (error) => console.error(error),
    });

    this.jobService.getJobStats(userId).subscribe({
      next: (data) => {
        this.jobStats = data.jobs;

        // Update chart data
        this.barChartData = {
          labels: this.jobStats.map((j) => j.title),
          datasets: [
            {
              ...this.barChartData.datasets[0],
              data: this.jobStats.map((j) => j.application_count),
            },
          ],
        };
      },
      error: (error) => console.error(error),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
