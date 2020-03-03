import {initialExtraForUser, ExtraForUser} from '../state/user.state';
import {ExtraForUserActions} from '../actions/extraForUser.actions';


export const extraForUserReducers = (
  state = initialExtraForUser,
  action: ExtraForUserActions
): ExtraForUser => {
  switch (action.type) {
    case ExtraForUserActions.GET_USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload,
      };
    }
    case ExtraForUserActions.GET_USERS_FAILURE: {
      return {
        ...state,
        users: [],
      };
    }

    case ExtraForUserActions.GET_SELECTED_USER_SUCCESS: {
      return {
        ...state,
        selectedUser: action.payload,
      };
    }
    case ExtraForUserActions.GET_SELECTED_USER_FAILURE: {
      return {
        ...state,
        selectedUser: null,
      };
    }

    case ExtraForUserActions.SEARCH_USER_SUCCESS: {
      return {
        ...state,
        users: action.payload,
      };
    }
    case ExtraForUserActions.SEARCH_USER_FAILURE: {
      return {
        ...state,
        users: null,
      };
    }

    default:
      return state;
  }
};
