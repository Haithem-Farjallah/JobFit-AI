import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '@core/services/admin.service';
import { RHList } from 'app/models/RHList.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
@Component({
  selector: 'app-rh-list',
  templateUrl: './rh-list.component.html',
  styleUrl: './rh-list.component.css',
})
export class RhListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'image_url',
    'firstname',
    'lastname',
    'email',
    'phone_number',
    'jobs_posted',
    'actions',
  ];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private _liveAnnouncer = inject(LiveAnnouncer);

  dataSource = new MatTableDataSource<RHList>();
  adminService = inject(AdminService);
  constructor() {
    this.getRHList();
  }
  getRHList() {
    this.adminService.getRHList().subscribe({
      next: (data: RHList[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
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
