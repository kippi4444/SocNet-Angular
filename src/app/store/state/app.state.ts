import {initialUserState, initialExtraForUser, UserState, ExtraForUser} from './user.state';
import {initialUserFriendship, UserFriendship} from './friendship.state';
import {initialUserPhotos, UserPhotos} from './photo.state';
import {initialMesState, MessageState} from './message.state';


export  interface AppState {
  users: UserState;
  extraForUser: ExtraForUser;
  friendship: UserFriendship;
  userAlbums: UserPhotos;
  message: MessageState;
}

export const initialAppState: AppState = {
  users: initialUserState,
  extraForUser: initialExtraForUser,
  friendship: initialUserFriendship,
  userAlbums: initialUserPhotos,
  message: initialMesState
};


export function getInitialState(): AppState {
  return initialAppState;
}
