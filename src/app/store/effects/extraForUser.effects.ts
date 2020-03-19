import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  ExtraForUserActions,
  GetAllUsers,
  GetAllUsersFailure,
  GetAllUsersSuccess,
  GetSelectedUser, GetSelectedUserFailure,
  GetSelectedUserSuccess,
  SearchingUsers, SearchingUsersFailure,
  SearchingUsersSuccess
} from '../actions/extraForUser.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../state/app.state';
import {UserService} from '../../services/user.service';
import {User} from '../../interfaces/user';
import {SearchService} from '../../services/search.service';
import {GetError} from '../actions/errors.actions';


@Injectable()
export class ExtraForUserEffects {

  @Effect()
  getAllUsers$ = this.actions$.pipe(
    ofType<GetAllUsers>(ExtraForUserActions.GET_USERS),
    switchMap((action: GetAllUsers ) => this.userService.getUsers(action.payload)
      .pipe(
        map((users: User[]) => new GetAllUsersSuccess(users)),
        catchError((err) => [new GetAllUsersFailure(err), new GetError(err)])
      )
    )
  );

  @Effect()
  getSelectedUser$ = this.actions$.pipe(
    ofType<GetSelectedUser>(ExtraForUserActions.GET_SELECTED_USER),
    switchMap((action: GetSelectedUser) => this.userService.getUser(action.payload)
      .pipe(
        map((user: User) => new GetSelectedUserSuccess(user)),
        catchError((err) => [new GetSelectedUserFailure(err), new GetError(err)])
      )
    )
  );

  @Effect()
  SearchingUsers$ = this.actions$.pipe(
    ofType<SearchingUsers>(ExtraForUserActions.SEARCH_USER),
    switchMap((action: SearchingUsers ) => this.searchService.search(action.payload)
      .pipe(
        map((users: User[]) => new SearchingUsersSuccess(users)),
        catchError((err) => [new SearchingUsersFailure(err), new GetError(err)])
      )
    )
  );

  constructor(private actions$: Actions,
              private userService: UserService,
              private searchService: SearchService){}
}
