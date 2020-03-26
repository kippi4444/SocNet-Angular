import {Action} from '@ngrx/store';

export const ErrorsActions = {
  ERROR: '[ERROR] ERROR',

};

export  class GetError implements  Action {
  public readonly type = ErrorsActions.ERROR;
  constructor(public payload: object) {}
}




export type ErrorsActions =
  GetError ;
