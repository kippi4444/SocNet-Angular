import {} from '../state/user.state';
import {createSelector} from '@ngrx/store';
import {AppState} from '../state/app.state';
import {UserFriendship} from '../state/friendship.state';

const friendshipUser = (state: AppState) => state.friendship;

export const allFriends = createSelector(
  friendshipUser,
  (state: UserFriendship) => state.friends
);

export const allRequests = createSelector(
  friendshipUser,
  (state: UserFriendship) => state.requests
);


