
import {initialMesState, MessageState} from '../state/message.state';
import {MessageActions} from '../actions/message.actions';

export const mesReducers = (
  state = initialMesState,
  action: MessageActions
): MessageState => {
  switch (action.type) {
    case MessageActions.SEND_MES_SUCCESS: {
      return {
        ...state,

      };
    }
    case MessageActions.SEND_MES_FAILURE: {
      return {
        ...state,

      };
    }
    case MessageActions.GET_MES_SUCCESS: {
      return {
        ...state,
        message: action.payload,
      };
    }
    case MessageActions.GET_MES_FAILURE: {
      return {
        ...state,
        message: null,
      };
    }

    case MessageActions.SEND_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
      };
    }
    case MessageActions.SEND_NOTIFICATIONS_FAILURE: {
      return {
        ...state,
      };
    }

    case MessageActions.NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        notification: action.payload,
      };
    }
    case MessageActions.NOTIFICATIONS_FAILURE: {
      return {
        ...state,
        notification: null,
      };
    }

    case MessageActions.MAIN_CONNECT_SOCKET_SUCCESS: {
      return {
        ...state,
      };
    }
    case MessageActions.MAIN_CONNECT_SOCKET_FAILURE: {
      return {
        ...state,
      };
    }

    case MessageActions.MAIN_DISCONNECT_SOCKET_SUCCESS: {
      return {
        ...state,
      };
    }
    case MessageActions.MAIN_DISCONNECT_SOCKET_FAILURE: {
      return {
        ...state,
      };
    }

    case MessageActions.DIALOG_CONNECT_SOCKET_SUCCESS: {
      return {
        ...state,
      };
    }
    case MessageActions.DIALOG_CONNECT_SOCKET_FAILURE: {
      return {
        ...state,
      };
    }

    case MessageActions.DIALOG_DISCONNECT_SOCKET_SUCCESS: {
      return {
        ...state,
      };
    }
    case MessageActions.DIALOG_DISCONNECT_SOCKET_FAILURE: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};
