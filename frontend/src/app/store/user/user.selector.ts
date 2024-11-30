import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

const userState = (state: AppState) => state.user;
export const selectUser = createSelector(userState, (state) => state.user);
