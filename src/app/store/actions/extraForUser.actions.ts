import { Action } from '@ngrx/store';
import {User} from '../../interfaces/user';
import {Friend} from '../../interfaces/friend';
import {QuerySearch} from '../../interfaces/querySearch';
import {Photo} from '../../interfaces/photo';



export const ExtraForUserActions = {
  GET_USERS: '[AllUsers] Get All Users',
  GET_USERS_SUCCESS: '[AllUsers] Get All Users Success',
  GET_USERS_FAILURE: '[AllUsers] Get All Users Failed',
  GET_SELECTED_USER: '[AllUsers] Get Selected User',
  GET_SELECTED_USER_SUCCESS: '[AllUsers] Get Selected User Success',
  GET_SELECTED_USER_FAILURE: '[AllUsers] Get Selected User Failed',
  SEARCH_USER: '[AllUsers] Search User',
  SEARCH_USER_SUCCESS: '[AllUsers] Search User Success',
  SEARCH_USER_FAILURE: '[AllUsers] Search User Failed',
  ADD_FRIEND_LIST: '[UserFriendsList] ADD FRIEND For User List',
  ADD_FRIEND_LIST_SUCCESS: '[UserFriendsList] ADD FRIEND For User List Success',
  ADD_FRIEND_LIST_FAILURE: '[UserFriendsList] ADD FRIEND For User List Failed',
  DEL_FRIEND_LIST: '[UserFriendsList] DEL FRIEND From User List',
  DEL_FRIEND_LIST_SUCCESS: '[UserFriendsList] DEL FRIEND From User List Success',
  DEL_FRIEND_LIST_FAILURE: '[UserFriendsList] DEL FRIEND From User List Failed',
  DEL_REQUEST_FROM_LIST: '[UserFriendsList] DEL REQUEST From User List',
  DEL_REQUEST_FROM_LIST_SUCCESS: '[UserFriendsList] DEL REQUEST From User List Success',
  DEL_REQUEST_FROM_LIST_FAILURE: '[UserFriendsList] DEL REQUEST From User List Failed',
  CHANGE_AVATAR_SELECTED_AUTH_USER: '[SelectedAuthUserChangeAvatar] Selected Auth User Change Avatar',
  CHANGE_AVATAR_SELECTED_AUTH_USER_SUCCESS: '[SelectedAuthUserChangeAvatar] Selected Auth User Change Avatar',
  CHANGE_AVATAR_SELECTED_AUTH_USER_FAILURE: '[SelectedAuthUserChangeAvatar] Selected Auth User Change Avatar',
};

// ==============================  all users ================================ //

export  class GetAllUsers implements  Action {
  public readonly type = ExtraForUserActions.GET_USERS;
  constructor(public payload?: object) {}
}

export  class GetAllUsersSuccess implements  Action {
  public readonly type = ExtraForUserActions.GET_USERS_SUCCESS;
  constructor(public payload: User[]) {}
}

export  class GetAllUsersFailure implements  Action {
  public readonly type = ExtraForUserActions.GET_USERS_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  selected user ================================ //

export  class GetSelectedUser implements  Action {
  public readonly type = ExtraForUserActions.GET_SELECTED_USER;
  constructor(public payload: string) {}
}

export  class GetSelectedUserSuccess implements  Action {
  public readonly type = ExtraForUserActions.GET_SELECTED_USER_SUCCESS;
  constructor(public payload: User) {}
}

export  class GetSelectedUserFailure implements  Action {
  public readonly type = ExtraForUserActions.GET_SELECTED_USER_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  searching users ================================ //

export  class SearchingUsers implements  Action {
  public readonly type = ExtraForUserActions.SEARCH_USER;
  constructor(public payload?: QuerySearch) {}
}

export  class SearchingUsersSuccess implements  Action {
  public readonly type = ExtraForUserActions.SEARCH_USER_SUCCESS;
  constructor(public payload: User[]) {}
}

export  class SearchingUsersFailure implements  Action {
  public readonly type = ExtraForUserActions.SEARCH_USER_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  add friends ================================ //

export  class AddFriendsUserList implements  Action {
  public readonly type = ExtraForUserActions.ADD_FRIEND_LIST;
  constructor(public payload?: string) {}
}

export  class AddFriendsUserListSuccess implements  Action {
  public readonly type = ExtraForUserActions.ADD_FRIEND_LIST_SUCCESS;
  constructor(public payload: Friend) {}
}

export  class AddFriendsUserListFailure implements  Action {
  public readonly type = ExtraForUserActions.ADD_FRIEND_LIST_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  del friends ================================ //

export  class DelFriendsFromUserList implements  Action {
  public readonly type = ExtraForUserActions.DEL_FRIEND_LIST;
  constructor(public payload?: string) {}
}

export  class DelFriendsFromUserListSuccess implements  Action {
  public readonly type = ExtraForUserActions.DEL_FRIEND_LIST_SUCCESS;
  constructor(public payload: {friend: string, auth: string}) {}
}

export  class DelFriendsFromUserListFailure implements  Action {
  public readonly type = ExtraForUserActions.DEL_FRIEND_LIST_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  del request ================================ //

export  class DelRequestFromUserList implements  Action {
  public readonly type = ExtraForUserActions.DEL_REQUEST_FROM_LIST;
  constructor(public payload?: string) {}
}

export  class DelRequestFromUserListSuccess implements  Action {
  public readonly type = ExtraForUserActions.DEL_REQUEST_FROM_LIST_SUCCESS;
  constructor(public payload: string) {}
}

export  class DelRequestFromUserListFailure implements  Action {
  public readonly type = ExtraForUserActions.DEL_REQUEST_FROM_LIST_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  del request ================================ //

export  class SelectedAuthUserChangeAvatar implements  Action {
  public readonly type = ExtraForUserActions.CHANGE_AVATAR_SELECTED_AUTH_USER;
  constructor(public payload?: string) {}
}

export  class SelectedAuthUserChangeAvatarSuccess implements  Action {
  public readonly type = ExtraForUserActions.CHANGE_AVATAR_SELECTED_AUTH_USER_SUCCESS;
  constructor(public payload: Photo) {}
}

export  class SelectedAuthUserChangeAvatarFailure implements  Action {
  public readonly type = ExtraForUserActions.CHANGE_AVATAR_SELECTED_AUTH_USER_FAILURE;
  constructor(public payload?: any) {
  }
}

export type ExtraForUserActions = GetAllUsers |
  GetAllUsersSuccess |
  GetAllUsersFailure |
  GetSelectedUser |
  GetSelectedUserSuccess |
  GetSelectedUserFailure |
  SearchingUsers |
  SearchingUsersSuccess |
  SearchingUsersFailure |
  AddFriendsUserList |
  AddFriendsUserListSuccess |
  AddFriendsUserListFailure |
  DelFriendsFromUserList |
  DelFriendsFromUserListSuccess |
  DelFriendsFromUserListFailure |
  DelRequestFromUserList |
  DelRequestFromUserListSuccess |
  DelRequestFromUserListFailure |
  SelectedAuthUserChangeAvatar |
  SelectedAuthUserChangeAvatarSuccess |
  SelectedAuthUserChangeAvatarFailure;
