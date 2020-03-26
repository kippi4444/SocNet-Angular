import {ActionReducer} from '@ngrx/store';
import {UserActions} from '../actions/user.actions';

export function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
  return  (state, action) => {
    if (action.type === UserActions.GET_LOGOUT_USER_SUCCESS) {
      state = undefined;
    }
    return reducer(state, action);
  };
}
