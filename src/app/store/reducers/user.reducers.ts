import {initialExtraForUser, initialUserState, UserState} from '../state/user.state';
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
        authUser: null
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

    case UserActions.GET_SELECTED_DIALOG: {
      return {
        ...state,
        selectedDialog: null,
      };
    }
    case UserActions.GET_SELECTED_DIALOG_SUCCESS: {
      return {
        ...state,
        selectedDialog: action.payload,
      };
    }
    case UserActions.GET_SELECTED_DIALOG_FAILURE: {
      return {
        ...state,
        selectedDialog: null,
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
        lastDialog: action.payload,
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

    default:
      return state;
  }
};
