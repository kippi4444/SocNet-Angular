import {ActionReducerMap} from '@ngrx/store';
import {AppState} from '../state/app.state';
import {userReducers} from './user.reducers';
import {extraForUserReducers} from './extraForUser.reducer';
import {friendsReducers} from './friendship.reducers';
import {userPhotosReducers} from './photo.reducers';
import {mesReducers} from './message.reducers';
import {errorsReducers} from './errors.reducers';

export const appReducers: ActionReducerMap<AppState, any> = {
  users: userReducers,
  extraForUser: extraForUserReducers,
  friendship: friendsReducers,
  userAlbums: userPhotosReducers,
  message: mesReducers,
  errors: errorsReducers,
};
