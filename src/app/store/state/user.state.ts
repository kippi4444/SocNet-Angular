import {User} from '../../interfaces/user';
import {Dialog} from '../../interfaces/dialog';
import {Msg} from '../../interfaces/msg';

export interface UserState {
  authUser: User;
  allDialogs: Dialog[];
  lastDialog: Dialog;
  selectedDialog: Dialog;
  dialogMes: Msg[];
  dialogMesCount: {count: number}[];
  state: boolean;
}

export  const initialUserState: UserState = {
  authUser: null,
  allDialogs: [],
  lastDialog: null,
  selectedDialog: null,
  dialogMesCount: [],
  dialogMes: [],
  state: false,
};

export interface ExtraForUser {
  users: User[];
  selectedUser: User;
}

export  const initialExtraForUser: ExtraForUser = {
  users: [],
  selectedUser: null,
};
