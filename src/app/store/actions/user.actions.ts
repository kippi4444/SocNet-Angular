import { Action } from '@ngrx/store';
import {User} from '../../interfaces/user';
import {Pet} from '../../interfaces/pet';
import {Dialog} from '../../interfaces/dialog';
import {dialogMes} from '../../services/dialog.service';
import {Photo} from '../../interfaces/photo';


export const UserActions = {
  NEW_USER: '[User] New User',
  NEW_USER_SUCCESS: '[User] New User Success',
  NEW_USER_FAILURE: '[User] New User Failed',
  DEL_USER: '[User] Del User',
  DEL_USER_SUCCESS: '[User] Del User Success',
  DEL_USER_FAILURE: '[User] Del User Failed',
  UPDATED_USER: '[User] Updated User',
  UPDATED_USER_SUCCESS: '[User] Updated User Success',
  UPDATED_USER_FAILURE: '[User] Updated User Failed',
  GET_AUTH_USER: '[User] Get Auth User',
  GET_AUTH_USER_SUCCESS: '[User] Get Auth User Success',
  GET_AUTH_USER_FAILURE: '[User] Get Auth User Failed',
  GET_LOGIN_USER: '[User] Get Login User',
  GET_LOGIN_USER_SUCCESS: '[User] Get Login User Success',
  GET_LOGIN_USER_FAILURE: '[User] Get Login User Failed',
  GET_LOGOUT_USER: '[User] Get Logout User',
  GET_LOGOUT_USER_SUCCESS: '[User] Get Logout User Success',
  GET_LOGOUT_USER_FAILURE: '[User] Get Logout User Failed',
  ADD_PET: '[Pet] User Add Pet',
  ADD_PET_SUCCESS: '[Pet] User Add Pet Success',
  ADD_PET_FAILURE: '[Pet] User Add Pet Failed',
  DEL_PET: '[Pet] User Deleted Pet',
  DEL_PET_SUCCESS: '[Pet] User Deleted Pet Success',
  DEL_PET_FAILURE: '[Pet] User Deleted Pet Failed',
  GET_LOGIN_USER_DIALOGS: '[Dialogs] Get Login User Dialogs',
  GET_LOGIN_USER_DIALOGS_SUCCESS: '[Dialogs] Get Login User Dialogs Success',
  GET_LOGIN_USER_DIALOGS_FAILURE: '[Dialogs] Get Login User Dialogs Failed',
  GET_SELECTED_DIALOG: '[Dialogs] Get Selected  Dialog',
  GET_SELECTED_DIALOG_SUCCESS: '[Dialogs] Get Selected Dialog Success',
  GET_SELECTED_DIALOG_FAILURE: '[Dialogs] Get Selected Dialog Failed',
  ADD_DIALOG: '[Dialogs] Add Dialog',
  ADD_DIALOG_SUCCESS: '[Dialogs] Add Dialog Success',
  ADD_DIALOG_FAILURE: '[Dialogs] Add Dialog Failed',
  DEL_DIALOG: '[Dialogs] Del Dialog',
  DEL_DIALOG_SUCCESS: '[Dialogs] Del Dialog Success',
  DEL_DIALOG_FAILURE: '[Dialogs] Del Dialog Failed',
  EDIT_DIALOG: '[Dialogs] EDIT Dialog',
  EDIT_DIALOG_SUCCESS: '[Dialogs] EDIT Dialog Success',
  EDIT_DIALOG_FAILURE: '[Dialogs] EDIT Dialog Failed',
  SET_AVATAR: '[Avatar]  Set Avatar',
  SET_AVATAR_SUCCESS: '[Avatar] Set Avatar Success',
  SET_AVATAR_FAILURE: '[Avatar] Set Avatar Failed',
  CHANGE_AVATAR: '[Avatar]  Change Avatar',
  CHANGE_AVATAR_SUCCESS: '[Avatar] Change Avatar Success',
  CHANGE_AVATAR_FAILURE: '[Avatar] Change Avatar Failed',
};

// ============================== add user ================================//

export  class NewUser implements  Action {
  public readonly type = UserActions.NEW_USER;
  constructor(public payload: User) {
  }
}

export  class NewUserSuccess implements  Action {
  public readonly type = UserActions.NEW_USER_SUCCESS;
  constructor(public payload: User) {}
}

export  class NewUserFailure implements  Action {
  public readonly type = UserActions.NEW_USER_FAILURE;
  constructor(public payload?: any) {
  }
}

// ============================== del user ================================//

export  class DeleteUser implements  Action {
  public readonly type = UserActions.DEL_USER;
  constructor(public payload: string) {
  }
}

export  class DeleteUserSuccess implements  Action {
  public readonly type = UserActions.DEL_USER_SUCCESS;
  constructor(public payload?: any) {}
}

export  class DeleteUserFailure implements  Action {
  public readonly type = UserActions.DEL_USER_FAILURE;
  constructor(public payload?: any) {
  }
}

// ============================== update user ================================//
export  class UpdatedUser implements  Action {
  public readonly type = UserActions.UPDATED_USER;
  constructor(public payload: User) {
  }
}

export  class UpdatedUserSuccess implements  Action {
  public readonly type = UserActions.UPDATED_USER_SUCCESS;
  constructor(public payload: User) {}
}

export  class UpdatedUserFailure implements  Action {
  public readonly type = UserActions.UPDATED_USER_FAILURE;
  constructor(public payload?: any) {
  }
}

// ============================== auth user ================================//
export  class GetAuthUser implements  Action {
  public readonly type = UserActions.GET_AUTH_USER;
  constructor(public payload?: any) {
  }
}

export  class GetAuthUserSuccess implements  Action {
  public readonly type = UserActions.GET_AUTH_USER_SUCCESS;
  constructor(public payload: User) {}
}

export  class GetAuthUserFailure implements  Action {
  public readonly type = UserActions.GET_AUTH_USER_FAILURE;
  constructor(public payload?: any) {
  }
}

// ============================== login user ================================//

export  class GetLoginUser implements  Action {
  public readonly type = UserActions.GET_LOGIN_USER;
  constructor(public payload: User) {
  }
}

export  class GetLoginUserSuccess implements  Action {
  public readonly type = UserActions.GET_LOGIN_USER_SUCCESS;
  constructor(public payload: User) {}
}

export  class GetLoginUserFailure implements  Action {
  public readonly type = UserActions.GET_LOGIN_USER_FAILURE;
  constructor(public payload?: any) {
  }
}

// ============================== logout user ================================//

export  class GetLogoutUser implements  Action {
  public readonly type = UserActions.GET_LOGOUT_USER;
  constructor(public payload?: any) {
  }
}

export  class GetLogoutUserSuccess implements  Action {
  public readonly type = UserActions.GET_LOGOUT_USER_SUCCESS;
  constructor(public payload?: any) {}
}

export  class GetLogoutUserFailure implements  Action {
  public readonly type = UserActions.GET_LOGOUT_USER_FAILURE;
  constructor(public payload?: any) {
  }
}

// ============================== add pet ================================//

export  class AddPet implements  Action {
  public readonly type = UserActions.ADD_PET;
  constructor(public payload: Pet) {
  }
}

export  class AddPetSuccess implements  Action {
  public readonly type = UserActions.ADD_PET_SUCCESS;
  constructor(public payload: Pet) {}
}

export  class AddPetFailure implements  Action {
  public readonly type = UserActions.ADD_PET_FAILURE;
  constructor(public payload?: any) {
  }
}

// ============================== del pet ================================//

export  class DeletedPet implements  Action {
  public readonly type = UserActions.DEL_PET;
  constructor(public payload: string) {
  }
}

export  class DeletedPetSuccess implements  Action {
  public readonly type = UserActions.DEL_PET_SUCCESS;
  constructor(public payload: string) {}
}

export  class DeletedPetFailure implements  Action {
  public readonly type = UserActions.DEL_PET_FAILURE;
  constructor(public payload?: any) {
  }
}

// ============================== all dialogs ================================ //
export  class GetLoginUserDialogs implements  Action {
  public readonly type = UserActions.GET_LOGIN_USER_DIALOGS;
  constructor(public payload?: string) {}
}

export  class GetLoginUserDialogsSuccess implements  Action {
  public readonly type = UserActions.GET_LOGIN_USER_DIALOGS_SUCCESS;
  constructor(public payload: Dialog[]) {}
}

export  class GetLoginUserDialogsFailure implements  Action {
  public readonly type = UserActions.GET_LOGIN_USER_DIALOGS_FAILURE;
  constructor(public payload?: any) {
  }
}

// ============================== selected dialog ================================//
export  class GetSelectedDialog implements  Action {
  public readonly type = UserActions.GET_SELECTED_DIALOG;
  constructor(public payload: string) {}
}

export  class GetSelectedDialogSuccess implements  Action {
  public readonly type = UserActions.GET_SELECTED_DIALOG_SUCCESS;
  constructor(public payload: dialogMes) {}
}

export  class GetSelectedDialogFailure implements  Action {
  public readonly type = UserActions.GET_SELECTED_DIALOG_FAILURE;
  constructor(public payload?: any) {
  }
}

// ============================== selected dialog ================================//
export  class AddDialog implements  Action {
  public readonly type = UserActions.ADD_DIALOG;
  constructor(public payload: object) {}
}

export  class AddDialogSuccess implements  Action {
  public readonly type = UserActions.ADD_DIALOG_SUCCESS;
  constructor(public payload: Dialog) {}
}

export  class AddDialogFailure implements  Action {
  public readonly type = UserActions.ADD_DIALOG_FAILURE;
  constructor(public payload?: any) {
  }
}

// ============================== set avatar ================================//
export  class SetAvatar implements  Action {
  public readonly type = UserActions.SET_AVATAR;
  constructor(public payload: object) {}
}

export  class SetAvatarSuccess implements  Action {
  public readonly type = UserActions.SET_AVATAR_SUCCESS;
  constructor(public payload: Photo) {}
}

export  class SetAvatarFailure implements  Action {
  public readonly type = UserActions.SET_AVATAR_FAILURE;
  constructor(public payload?: any) {
  }
}

// ============================== change avatar ================================//
export  class ChangeAvatar implements  Action {
  public readonly type = UserActions.CHANGE_AVATAR;
  constructor(public payload: string) {}
}

export  class ChangeAvatarSuccess implements  Action {
  public readonly type = UserActions.CHANGE_AVATAR_SUCCESS;
  constructor(public payload: Photo) {}
}

export  class ChangeAvatarFailure implements  Action {
  public readonly type = UserActions.CHANGE_AVATAR_FAILURE;
  constructor(public payload?: any) {
  }
}

// ============================== Del Dialog ================================//
export  class DelDialog implements  Action {
  public readonly type = UserActions.DEL_DIALOG;
  constructor(public payload: string) {}
}

export  class DelDialogSuccess implements  Action {
  public readonly type = UserActions.DEL_DIALOG_SUCCESS;
  constructor(public payload: string) {}
}

export  class DelDialogFailure implements  Action {
  public readonly type = UserActions.DEL_DIALOG_FAILURE;
  constructor(public payload?: any) {
  }
}


export type UserActions =
  UpdatedUser |
  UpdatedUserSuccess |
  UpdatedUserFailure |
  DeleteUser |
  DeleteUserSuccess |
  DeleteUserFailure |
  NewUser |
  NewUserSuccess |
  NewUserFailure |
  GetLoginUser |
  GetLoginUserSuccess|
  GetLoginUserFailure |
  GetLogoutUser |
  GetLogoutUserSuccess|
  GetLogoutUserFailure |
  GetAuthUser |
  GetAuthUserSuccess |
  GetAuthUserFailure |
  AddPet |
  AddPetSuccess |
  AddPetFailure |
  DeletedPet |
  DeletedPetSuccess |
  DeletedPetFailure |
  GetLoginUserDialogs |
  GetLoginUserDialogsSuccess |
  GetLoginUserDialogsFailure |
  GetSelectedDialog |
  GetSelectedDialogSuccess |
  GetSelectedDialogFailure |
  AddDialog |
  AddDialogSuccess |
  AddDialogFailure|
  SetAvatar |
  SetAvatarSuccess |
  SetAvatarFailure |
  DelDialog |
  DelDialogSuccess |
  DelDialogFailure |
  ChangeAvatar |
  ChangeAvatarSuccess |
  ChangeAvatarFailure;
