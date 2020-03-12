
import {FriendshipUserActions} from '../actions/friendship.actions';
import {initialUserFriendship, UserFriendship} from '../state/friendship.state';


export const friendsReducers = (
  state = initialUserFriendship,
  action: FriendshipUserActions,
): UserFriendship => {
  switch (action.type) {
    case FriendshipUserActions.ADD_FRIEND_SUCCESS: {
      return {
        ...state,
        friends: state.friends.concat(state.requests.filter(req => req.friend._id === action.payload.owner)),
        requests: state.requests.filter(req => req.friend._id !== action.payload.owner),
      };
    }
    case FriendshipUserActions.ADD_FRIEND_FAILURE: {
      return {
        ...state
      };
    }

    case FriendshipUserActions.DEL_FRIEND_SUCCESS: {
      return {
      ...state,
        friends: state.friends.filter(friend => friend.friend._id !== action.payload),
      };
    }
    case FriendshipUserActions.DEL_FRIEND_FAILURE: {
      return {
        ...state
      };
    }

    case FriendshipUserActions.GET_ALL_FRIENDS_SUCCESS: {
      return {
        ...state,
        friends: action.payload,
      };
    }
    case FriendshipUserActions.GET_ALL_FRIENDS_FAILURE: {
      return {
        ...state
      };
    }

    case FriendshipUserActions.GET_ALL_REQUEST_SUCCESS: {
      return {
        ...state,
        requests: action.payload,
      };
    }
    case FriendshipUserActions.GET_ALL_REQUEST_FAILURE: {
      return {
        ...state
      };
    }

    case FriendshipUserActions.DEL_REQUEST_SUCCESS: {
      return {
        ...state,
        requests: state.requests.filter(req => req._id !== action.payload),
      };
    }
    case FriendshipUserActions.DEL_REQUEST_FAILURE: {
      return {
        ...state
      };
    }

    default:
      return state;
  }
};
