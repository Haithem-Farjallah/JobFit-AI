import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { roles } from 'config/role';

export const rhGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const role = authService.getRole();
  if (!role) {
    return false;
  }
  return role === roles.RH;
};
