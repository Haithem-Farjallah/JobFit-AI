import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApplicationsService } from '@core/services/applications.service';
import { Application } from 'app/models/applications.model';

/**
 * @title Table with sorting
 */
@Component({
  selector: 'table-sorting-example',
  styleUrls: ['application-list.component.css'], // Fixed typo from `styleUrl` to `styleUrls`
  templateUrl: 'application-list.component.html',
})
export class ApplicationListComponent implements AfterViewInit {
  loading: boolean = false;
  ELEMENT_DATA: {
    Job: string;
    fullName: string;
    score: number;
    created_at: string;
    link: string;
  }[] = [];
  dataSource = new MatTableDataSource<{
    Job: string;
    fullName: string;
    score: number;
    created_at: string;
    link: string;
  }>();

  constructor(private applicationService: ApplicationsService) {
    this.applicationService.getApplications(2, 0)?.subscribe({
      next: (data: Application[]) => {
        this.ELEMENT_DATA = data.map((app) => ({
          Job: app.title,
          fullName: `${app.firstname} ${app.lastname}`,
          score: app.score,
          created_at: new Date(app.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
          link: `/applications/${app.id}`,
        }));
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      },
    });
  }

  private _liveAnnouncer = inject(LiveAnnouncer);

  displayedColumns: string[] = [
    'Job',
    'fullName',
    'score',
    'created_at',
    'link',
  ]; // Ensure these match the matColumnDef

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
