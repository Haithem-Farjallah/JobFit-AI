import { createReducer, on } from '@ngrx/store';
import { AuthUser } from 'app/models/authUser.model';
import { createUser, logoutUser, updateUser } from './user.actions';

export interface UserState {
  user: AuthUser | null;
}
export const initialState: UserState = {
  user: null,
};
export const userReducer = createReducer(
  initialState,
  on(createUser, (state, { user }) => ({ ...state, user })),
  on(logoutUser, (state) => ({ ...state, user: null })),
  on(updateUser, (state, { user }) => ({ ...state, user }))
);
