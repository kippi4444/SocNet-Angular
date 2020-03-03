import {Friend} from '../../interfaces/friend';

export interface UserFriendship {
  friends: Friend[];
  requests: Friend[];
}

export  const initialUserFriendship: UserFriendship = {
  friends: [],
  requests: [],
};
