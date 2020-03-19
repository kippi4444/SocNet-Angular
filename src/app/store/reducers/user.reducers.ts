import {initialUserState, UserState} from '../state/user.state';
import {UserActions} from '../actions/user.actions';

export const userReducers = (
  state = initialUserState,
  action: UserActions
): UserState => {
  switch (action.type) {
    case UserActions.NEW_USER_SUCCESS: {
      return {
        ...state,
        authUser: action.payload,
        state: true
      };
    }
    case UserActions.NEW_USER_FAILURE: {
      return {
        ...state,
        authUser: null
      };
    }


    case UserActions.DEL_USER_SUCCESS: {
      return {
        ...state,
        authUser: null,
        state: false
      };
    }
    case UserActions.DEL_USER_FAILURE: {
      return {
        ...state
      };
    }


    case UserActions.UPDATED_USER_SUCCESS: {
      return {
        ...state,
        authUser: action.payload
      };
    }
    case UserActions.UPDATED_USER_FAILURE: {
      return {
        ...state
      };
    }


    case UserActions.GET_AUTH_USER_SUCCESS: {
      return {
        ...state,
        authUser: action.payload,
        state: true
      };
    }
    case UserActions.GET_AUTH_USER_FAILURE: {
      return {
        ...state,
        authUser: null,
        state: false
      };
    }


    case UserActions.GET_LOGIN_USER_SUCCESS: {
      return {
        ...state,
        authUser: action.payload,
        state: true
      };
    }
    case UserActions.GET_LOGIN_USER_FAILURE: {
      return {
        ...state,
      };
    }


    case UserActions.GET_LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        authUser: null,
        state: false
      };
    }
    case UserActions.GET_LOGOUT_USER_FAILURE: {
      return {
        ...state
      };
    }

    case UserActions.ADD_PET_SUCCESS: {
      return {
        ...state,
        authUser: {...state.authUser,
          pets: state.authUser.pets.concat(action.payload)}
      };
    }
    case UserActions.ADD_PET_FAILURE: {
      return {
        ...state
      };
    }

    case UserActions.DEL_PET_SUCCESS: {
      return {
        ...state,
        authUser: {...state.authUser,
          pets: state.authUser.pets.filter(pet => pet._id !== action.payload)}
      };
    }
    case UserActions.DEL_PET_FAILURE: {
      return {
        ...state
      };
    }

    case UserActions.GET_LOGIN_USER_DIALOGS_SUCCESS: {
      return {
        ...state,
        allDialogs: action.payload,
      };
    }
    case UserActions.GET_LOGIN_USER_DIALOGS_FAILURE: {
      return {
        ...state,
        allDialogs: [],
      };
    }

    case UserActions.MESSAGE_READ_SUCCESS: {
      if (action.payload.user._id !== action.payload.mes.user._id) {
        setTimeout(() => {
        return {
          ...state,
          dialogMes:  state.dialogMes.filter(mes => {
              if (mes.isReading.length) {
                mes.isReading = [];
              }
              return mes;
            })};
        }, 500);
      }
      const dialogs = state.allDialogs.filter( dialog => dialog._id === action.payload.mes.dialog );
      dialogs[0].mes = [action.payload.mes];
      return {
        ...state,
        allDialogs: dialogs.concat(state.allDialogs.filter( dialog => dialog._id !== action.payload.mes.dialog))
      };
    }

    case UserActions.MESSAGE_READ_FAILURE: {
      return {
        ...state,
      };
    }

    case UserActions.GET_SELECTED_DIALOG_SUCCESS: {
      if (action.payload.event === 'isRead') {
        return {
          ...state,
          dialogMes:  state.dialogMes.filter(mes => {
              if (mes.isReading.length) {
                mes.isReading = [];
              }
              return mes;
            })
        };
      } else {
        return {
          ...state,
          selectedDialog: action.payload.dialog,
          dialogMes: action.payload.mes,
        };
      }
    }

    case UserActions.SCROLL_MES_SUCCESS: {
      return {
        ...state,
        selectedDialog: action.payload.dialog,
        dialogMes: action.payload.mes.concat(state.dialogMes),
      };
    }

    case UserActions.SCROLL_MES_FAILURE: {
      return {
        ...state,
      };
    }

    case UserActions.GET_SELECTED_DIALOG_FAILURE: {

      return {
        ...state,
      };
    }

    case UserActions.ADD_DIALOG: {
      return {
        ...state,
        lastDialog: null,
      };
    }
    case UserActions.ADD_DIALOG_SUCCESS: {
      return {
        ...state,
        lastDialog: action.payload[0],
        allDialogs: action.payload.concat(state.allDialogs.filter(dialog => dialog._id !== action.payload[0]._id))
      };
    }
    case UserActions.ADD_DIALOG_FAILURE: {
      return {
        ...state,
      };
    }

    case UserActions.SET_AVATAR_SUCCESS: {
      return {
        ...state,
        authUser: {...state.authUser,
          avatar: action.payload},
      };
    }
    case UserActions.SET_AVATAR_FAILURE: {
      return {
        ...state,
      };
    }

    case UserActions.CHANGE_AVATAR_SUCCESS: {
      return {
        ...state,
        authUser: {...state.authUser,
          avatar: action.payload},
      };
    }
    case UserActions.CHANGE_AVATAR_FAILURE: {
      return {
        ...state,
      };
    }

    case UserActions.DEL_DIALOG_SUCCESS: {
      return {
        ...state,
        selectedDialog: null,
        allDialogs: state.allDialogs.filter(dialog => dialog._id !== action.payload),
      };
    }
    case UserActions.DEL_DIALOG_FAILURE: {
      return {
        ...state,
      };
    }

    case UserActions.UP_DIALOG_SUCCESS: {
      const upper = state.allDialogs.filter(dialog => dialog._id === action.payload.mes.dialog);
      upper[0].mes = [action.payload.mes];
      return {
        ...state,
        allDialogs: upper.concat(state.allDialogs.filter(dialog => dialog._id !== action.payload.mes.dialog)),

      };
    }
    case UserActions.UP_DIALOG_FAILURE: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};
