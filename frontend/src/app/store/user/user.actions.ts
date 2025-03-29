import { createAction, props } from '@ngrx/store';
import { AuthUser } from 'app/models/authUser.model';

export const createUser = createAction(
  '[Login Page],Create User',
  props<{ user: AuthUser }>()
);
export const updateUser = createAction(
  '[update User] Update User',
  props<{ user: AuthUser }>()
);

export const logoutUser = createAction('Logout User');
