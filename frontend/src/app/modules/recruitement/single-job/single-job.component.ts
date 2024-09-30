import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-job',
  templateUrl: './single-job.component.html',
  styleUrl: './single-job.component.css',
})
export class SingleJobComponent {
  id!: number;
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id);
    });
  }
}
