import { Action } from '@ngrx/store';
import {User} from '../../interfaces/user';



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
  constructor(public payload: string) {}
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

export  class AddFriendsUser implements  Action {
  public readonly type = ExtraForUserActions.SEARCH_USER;
  constructor(public payload: string) {}
}

export  class AddFriendsUserSuccess implements  Action {
  public readonly type = ExtraForUserActions.SEARCH_USER_SUCCESS;
  constructor(public payload: User[]) {}
}

export  class AddFriendsUserFailure implements  Action {
  public readonly type = ExtraForUserActions.SEARCH_USER_FAILURE;
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
  AddFriendsUser;
