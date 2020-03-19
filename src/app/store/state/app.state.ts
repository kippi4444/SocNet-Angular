import {initialUserState, initialExtraForUser, UserState, ExtraForUser} from './user.state';
import {initialUserFriendship, UserFriendship} from './friendship.state';
import {initialUserPhotos, UserPhotos} from './photo.state';
import {initialMesState, MessageState} from './message.state';
import {ErrorsState, initialErrorsState} from './errors.state';


export  interface AppState {
  users: UserState;
  extraForUser: ExtraForUser;
  friendship: UserFriendship;
  userAlbums: UserPhotos;
  message: MessageState;
  errors: ErrorsState;
}

export const initialAppState: AppState = {
  users: initialUserState,
  extraForUser: initialExtraForUser,
  friendship: initialUserFriendship,
  userAlbums: initialUserPhotos,
  message: initialMesState,
  errors: initialErrorsState
};


export function getInitialState(): AppState {
  return initialAppState;
}
