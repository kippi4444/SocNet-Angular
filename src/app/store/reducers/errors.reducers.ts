
import {ErrorsState, initialErrorsState} from '../state/errors.state';
import {ErrorsActions} from '../actions/errors.actions';



export function errorsReducers(
  state = initialErrorsState,
  action: ErrorsActions
): ErrorsState {
  switch (action.type) {

    case ErrorsActions.ERROR: {
      return {
        ...state,
        errors: action.payload,
      };
    }

    default:
      return state;
  }
};
