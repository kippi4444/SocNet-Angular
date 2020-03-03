import { Action } from '@ngrx/store';
import {Friend} from '../../interfaces/friend';




export const FriendshipUserActions = {
  ADD_FRIEND: '[Friend] Add Friend',
  ADD_FRIEND_SUCCESS: '[Friend] Add Friend Success',
  ADD_FRIEND_FAILURE: '[Friend] Add Friend Failed',
  DEL_FRIEND: '[Friend] Del Friend User',
  DEL_FRIEND_SUCCESS: '[Friend] Del Friend Success',
  DEL_FRIEND_FAILURE: '[Friend] Del Friend Failed',
  GET_ALL_FRIENDS: '[Friend] Get All Friends User',
  GET_ALL_FRIENDS_SUCCESS: '[Friend] Get All Friends Success',
  GET_ALL_FRIENDS_FAILURE: '[Friend] Get All Friends Failed',
  GET_ALL_REQUEST: '[Request] Get All Request',
  GET_ALL_REQUEST_SUCCESS: '[Request] Get All Request Success',
  GET_ALL_REQUEST_FAILURE: '[Request] Get All Request Failed',
  DEL_REQUEST: '[Request] Del Request',
  DEL_REQUEST_SUCCESS: '[Request] Del Request Success',
  DEL_REQUEST_FAILURE: '[Request] Del Request Failed',
};

// ==============================  add friend ================================ //

export  class AddFriend implements  Action {
  public readonly type = FriendshipUserActions.ADD_FRIEND;
  constructor(public payload: Friend) {}
}

export  class AddFriendSuccess implements  Action {
  public readonly type = FriendshipUserActions.ADD_FRIEND_SUCCESS;
  constructor(public payload: Friend) {}
}

export  class AddFriendFailure implements  Action {
  public readonly type = FriendshipUserActions.ADD_FRIEND_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  del friend ================================ //

export  class DelFriend implements  Action {
  public readonly type = FriendshipUserActions.DEL_FRIEND;
  constructor(public payload: string) {}
}

export  class DelFriendSuccess implements  Action {
  public readonly type = FriendshipUserActions.DEL_FRIEND_SUCCESS;
  constructor(public payload: string) {}
}

export  class DelFriendFailure implements  Action {
  public readonly type = FriendshipUserActions.DEL_FRIEND_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  get all friends ================================ //

export  class GetAllFriends implements  Action {
  public readonly type = FriendshipUserActions.GET_ALL_FRIENDS;
  constructor(public payload: string) {}
}

export  class GetAllFriendsSuccess implements  Action {
  public readonly type = FriendshipUserActions.GET_ALL_FRIENDS_SUCCESS;
  constructor(public payload: Friend[]) {}
}

export  class GetAllFriendsFailure implements  Action {
  public readonly type = FriendshipUserActions.GET_ALL_FRIENDS_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  get all requests ================================ //

export  class GetAllRequests implements  Action {
  public readonly type = FriendshipUserActions.GET_ALL_REQUEST;
  constructor(public payload?: string) {}
}

export  class GetAllRequestsSuccess implements  Action {
  public readonly type = FriendshipUserActions.GET_ALL_REQUEST_SUCCESS;
  constructor(public payload: Friend[]) {}
}

export  class GetAllRequestsFailure implements  Action {
  public readonly type = FriendshipUserActions.GET_ALL_REQUEST_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  del request ================================ //

export  class DelRequest implements  Action {
  public readonly type = FriendshipUserActions.DEL_REQUEST;
  constructor(public payload: string) {}
}

export  class DelRequestSuccess implements  Action {
  public readonly type = FriendshipUserActions.DEL_REQUEST_SUCCESS;
  constructor(public payload: string) {}
}

export  class DelRequestFailure implements  Action {
  public readonly type = FriendshipUserActions.DEL_REQUEST_FAILURE;
  constructor(public payload?: any) {
  }
}

export type FriendshipUserActions = AddFriend |
  AddFriendSuccess |
  AddFriendFailure |
  DelFriend |
  DelFriendSuccess |
  DelFriendFailure |
  GetAllFriends |
  GetAllFriendsSuccess |
  GetAllFriendsFailure |
  GetAllRequests |
  GetAllRequestsSuccess |
  GetAllRequestsFailure |
  DelRequest |
  DelRequestSuccess |
  DelRequestFailure;
