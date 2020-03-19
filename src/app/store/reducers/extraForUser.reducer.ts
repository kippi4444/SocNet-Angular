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

    case ExtraForUserActions.ADD_FRIEND_LIST_SUCCESS: {
      const friend = state.users.filter(el =>  el._id === action.payload.friend);
      const owner = state.users.filter(el =>  el._id === action.payload.owner);
      const res = friend[0].requests.filter(i => owner[0].requests.indexOf(i) < 0);
      state.users.map(usr => {
        if (usr._id === action.payload.owner) {
          if (res.length > 0) {
            usr.friends = usr.friends.concat(action.payload);
          } else {
            usr.requests = usr.requests.concat(action.payload);
          }
        } else { return; }
      });
      return {
        ...state
      };
    }

    case ExtraForUserActions.ADD_FRIEND_LIST_FAILURE: {
      return {
        ...state
      };
    }

    case ExtraForUserActions.DEL_FRIEND_LIST_SUCCESS: {
      state.users.map(usr => {
        if (usr._id === action.payload.friend) {
          usr.friends = usr.friends.filter(friend => friend.friend !== action.payload.auth);
        }
      });
      return {
        ...state
      };
    }
    case ExtraForUserActions.DEL_FRIEND_LIST_FAILURE: {
      return {
        ...state
      };
    }

    case ExtraForUserActions.DEL_REQUEST_FROM_LIST_SUCCESS: {
      return {
        ...state,
        ...state.users.map(usr => {
          usr.requests = usr.requests.filter(req => req._id !== action.payload);
        })
      };
    }
    case ExtraForUserActions.DEL_REQUEST_FROM_LIST_FAILURE: {
      return {
        ...state
      };
    }

    case ExtraForUserActions.CHANGE_AVATAR_SELECTED_AUTH_USER_SUCCESS: {
      return {
        ...state,
        selectedUser: {...state.selectedUser, avatar: action.payload}
      };
    }
    case ExtraForUserActions.CHANGE_AVATAR_SELECTED_AUTH_USER_FAILURE: {
      return {
        ...state
      };
    }

    default:
      return state;
  }
};
