import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

export const candidatGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const auth = inject(AuthService);

  const token = auth.getToken();
  if (!token) {
    return true;
  }
  return auth.isAuthenticated().pipe(
    map((response) => {
      if (response.status === 200) {
        router.navigate(['/applications']);
        return false;
      } else {
        auth.logout();
        router.navigate(['/auth/login']);
        return false;
      }
    }),
    catchError((error) => {
      console.log(error);
      auth.logout();
      router.navigate(['/auth/login']);
      return of(false);
    })
  );
};
