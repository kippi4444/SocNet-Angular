import {User} from '../../interfaces/user';
import {Dialog} from '../../interfaces/dialog';
import {dialogMes} from '../../services/dialog.service';


export interface UserState {
  authUser: User;
  allDialogs: Dialog[];
  lastDialog: Dialog;
  selectedDialog: dialogMes;
  state: boolean;
}

export interface ExtraForUser {
  users: User[];
  selectedUser: User;
}

export  const initialUserState: UserState = {
  authUser: null,
  allDialogs: [],
  lastDialog: null,
  selectedDialog: null,
  state: false,
};



export  const initialExtraForUser: ExtraForUser = {
  users: [],
  selectedUser: null,
};
