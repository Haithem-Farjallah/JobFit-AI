import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserService } from '@core/services/user.service';

export const profileDetailsResolver: ResolveFn<boolean> = (route, state) => {
  const userService = inject(UserService);
  const id = route.params['id'];
  return userService.getUserDetails(id);
};
