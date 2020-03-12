import {Action} from '@ngrx/store';
import {User} from '../../interfaces/user';
import {Msg} from '../../interfaces/msg';


export const MessageActions = {
  SEND_MES: '[Messages] Send Message',
  SEND_MES_SUCCESS: '[Messages] Send Message Success',
  SEND_MES_FAILURE: '[Messages] Send Message Failed',
  GET_MES: '[Messages] Get Mes',
  GET_MES_SUCCESS: '[Messages] Get Mes Success',
  GET_MES_FAILURE: '[Messages] Get Mes Failed',
  NOTIFICATIONS: '[NOTIFICATIONS] NOTIFICATIONS',
  NOTIFICATIONS_SUCCESS: '[NOTIFICATIONS] NOTIFICATIONS Success',
  NOTIFICATIONS_FAILURE: '[NOTIFICATIONS] NOTIFICATIONS Failed',
  SEND_NOTIFICATIONS: '[NOTIFICATIONS] SEND_NOTIFICATIONS',
  SEND_NOTIFICATIONS_SUCCESS: '[NOTIFICATIONS] SEND_NOTIFICATIONS Success',
  SEND_NOTIFICATIONS_FAILURE: '[NOTIFICATIONS] SEND_NOTIFICATIONS Failed',
  MAIN_CONNECT_SOCKET: '[SOCKET] Main Socket Connect',
  MAIN_CONNECT_SOCKET_SUCCESS: '[SOCKET] Main Socket Connect Success',
  MAIN_CONNECT_SOCKET_FAILURE: '[SOCKET] Main Socket Connect Failed',
  DIALOG_CONNECT_SOCKET: '[SOCKET] Dialog Socket Connect',
  DIALOG_CONNECT_SOCKET_SUCCESS: '[SOCKET] Dialog Socket Connect Success',
  DIALOG_CONNECT_SOCKET_FAILURE: '[SOCKET] Dialog Socket Connect Failed',
  MAIN_DISCONNECT_SOCKET: '[SOCKET] Main Socket DISConnect',
  MAIN_DISCONNECT_SOCKET_SUCCESS: '[SOCKET] Main Socket DISConnect Success',
  MAIN_DISCONNECT_SOCKET_FAILURE: '[SOCKET] Main Socket DISConnect Failed',
  DIALOG_DISCONNECT_SOCKET: '[SOCKET] Dialog Socket DISConnect',
  DIALOG_DISCONNECT_SOCKET_SUCCESS: '[SOCKET] Dialog Socket DISConnect Success',
  DIALOG_DISCONNECT_SOCKET_FAILURE: '[SOCKET] Dialog Socket DISConnect Failed',
};

// ==============================  main connect ================================ //

export  class MainConnectSocket implements  Action {
  public readonly type = MessageActions.MAIN_CONNECT_SOCKET;
  constructor(public payload?: object) {}
}

export  class MainConnectSocketSuccess implements  Action {
  public readonly type = MessageActions.MAIN_CONNECT_SOCKET_SUCCESS;
  constructor(public payload: any) {}
}

export  class MainConnectSocketFailure implements  Action {
  public readonly type = MessageActions.MAIN_CONNECT_SOCKET_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  dialog connect ================================ //

export  class DialogConnectSocket implements  Action {
  public readonly type = MessageActions.DIALOG_CONNECT_SOCKET;
  constructor(public payload?: object) {}
}

export  class DialogConnectSocketSuccess implements  Action {
  public readonly type = MessageActions.DIALOG_CONNECT_SOCKET_SUCCESS;
  constructor(public payload: any) {}
}

export  class DialogConnectSocketFailure implements  Action {
  public readonly type = MessageActions.DIALOG_CONNECT_SOCKET_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  notification mes ================================ //

export  class GetNotification implements  Action {
  public readonly type = MessageActions.NOTIFICATIONS;
  constructor(public payload?: any) {}
}

export  class GetNotificationSuccess implements  Action {
  public readonly type = MessageActions.NOTIFICATIONS_SUCCESS;
  constructor(public payload: Msg) {}
}

export  class GetNotificationFailure implements  Action {
  public readonly type = MessageActions.NOTIFICATIONS_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  send mes ================================ //

export  class SendMes implements  Action {
  public readonly type = MessageActions.SEND_MES;
  constructor(public payload: Msg) {}
}

export  class SendMesSuccess implements  Action {
  public readonly type = MessageActions.SEND_MES_SUCCESS;
  constructor(public payload: Msg) {}
}

export  class SendMesFailure implements  Action {
  public readonly type = MessageActions.SEND_MES_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  get mes ================================ //

export  class GetMes implements  Action {
  public readonly type = MessageActions.GET_MES;
  constructor(public payload?: string) {}
}

export  class GetMesSuccess implements  Action {
  public readonly type = MessageActions.GET_MES_SUCCESS;
  constructor(public payload: Msg) {}
}

export  class GetMesFailure implements  Action {
  public readonly type = MessageActions.GET_MES_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  disconnect dialog ================================ //

export  class DialogDisconnect implements  Action {
  public readonly type = MessageActions.DIALOG_DISCONNECT_SOCKET;
  constructor(public payload?: string) {}
}

export  class DialogDisconnectSuccess implements  Action {
  public readonly type = MessageActions.DIALOG_DISCONNECT_SOCKET_SUCCESS;
  constructor(public payload?: any) {}
}

export  class DialogDisconnectFailure implements  Action {
  public readonly type = MessageActions.DIALOG_DISCONNECT_SOCKET_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  disconnect dialog ================================ //

export  class MainDisconnect implements  Action {
  public readonly type = MessageActions.MAIN_DISCONNECT_SOCKET;
  constructor(public payload?: string) {}
}

export  class MainDisconnectSuccess implements  Action {
  public readonly type = MessageActions.MAIN_DISCONNECT_SOCKET_SUCCESS;
  constructor(public payload?: any) {}
}

export  class MainDisconnectFailure implements  Action {
  public readonly type = MessageActions.MAIN_DISCONNECT_SOCKET_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  send notification ================================ //

export  class SendNotification implements  Action {
  public readonly type = MessageActions.SEND_NOTIFICATIONS;
  constructor(public payload?: any) {}
}

export  class SendNotificationSuccess implements  Action {
  public readonly type = MessageActions.SEND_NOTIFICATIONS_SUCCESS;
  constructor(public payload?: any) {}
}

export  class SendNotificationFailure implements  Action {
  public readonly type = MessageActions.SEND_NOTIFICATIONS_FAILURE;
  constructor(public payload?: any) {
  }
}



export type MessageActions = SendMes |
  SendMesSuccess |
  SendMesFailure |
  MainConnectSocket |
  MainConnectSocketSuccess |
  MainConnectSocketFailure |
  DialogConnectSocket |
  DialogConnectSocketSuccess |
  DialogConnectSocketFailure |
  GetNotification |
  GetNotificationSuccess |
  GetNotificationFailure |
  GetMes |
  GetMesSuccess |
  GetMesFailure |
  DialogDisconnect |
  DialogDisconnectSuccess |
  DialogDisconnectFailure |
  MainDisconnect |
  MainDisconnectFailure |
  MainDisconnectSuccess |
  SendNotification |
  SendNotificationSuccess |
  SendNotificationFailure;
