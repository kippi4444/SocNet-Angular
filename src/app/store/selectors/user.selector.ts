import {UserState} from '../state/user.state';
import {createSelector} from '@ngrx/store';
import {AppState} from '../state/app.state';

const selectUser = (state: AppState) => state.users;

export const authentificatedUser = createSelector(
  selectUser,
  (state: UserState) => state.authUser
);

export const stateAuth = createSelector(
  selectUser,
  (state: UserState) => state.state
);

export const allDialogs = createSelector(
  selectUser,
  (state: UserState) => state.allDialogs
);

export const selectedDialog = createSelector(
  selectUser,
  (state: UserState) => state.selectedDialog
);
export const addDialog = createSelector(
  selectUser,
  (state: UserState) => state.lastDialog
);

