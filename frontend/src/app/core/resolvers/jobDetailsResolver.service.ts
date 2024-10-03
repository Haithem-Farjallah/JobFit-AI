import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { JobService } from '@core/services/job.service';

@Injectable({
  providedIn: 'root',
})
export class JobDetailsResolver implements Resolve<any> {
  constructor(private jobService: JobService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'] || route.parent?.params['id'];
    return this.jobService.getJobById(id);
  }
}
