import {initialUserState, initialExtraForUser, UserState, ExtraForUser} from './user.state';
import {initialUserFriendship, UserFriendship} from './friendship.state';
import {initialUserPhotos, UserPhotos} from './photo.state';


export  interface AppState {
  users: UserState;
  extraForUser: ExtraForUser;
  friendship: UserFriendship;
  userAlbums: UserPhotos;
}

export const initialAppState: AppState = {
  users: initialUserState,
  extraForUser: initialExtraForUser,
  friendship: initialUserFriendship,
  userAlbums: initialUserPhotos
};


export function getInitialState(): AppState {
  return initialAppState;
}
