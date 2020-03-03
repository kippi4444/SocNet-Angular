import {createSelector} from '@ngrx/store';
import {ExtraForUser} from '../state/user.state';
import {AppState} from '../state/app.state';

const extraUser = (state: AppState) => state.extraForUser;

export const allUsers = createSelector(
  extraUser,
  (state: ExtraForUser) => state.users
);

export const selectedUser = createSelector(
  extraUser,
  (state: ExtraForUser) => state.selectedUser
);


