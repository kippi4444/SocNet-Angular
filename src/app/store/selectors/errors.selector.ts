import {createSelector} from '@ngrx/store';
import {ExtraForUser} from '../state/user.state';
import {AppState} from '../state/app.state';
import {ErrorsState} from '../state/errors.state';

const errorsHandling = (state: AppState) => state.errors;

export const searchErrors = createSelector(
  errorsHandling,
  (state: ErrorsState) => state.errors
);

