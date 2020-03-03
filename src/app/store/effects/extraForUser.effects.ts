import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  ExtraForUserActions, GetAllUsers, GetAllUsersSuccess, GetSelectedUser, GetSelectedUserSuccess, SearchingUsers, SearchingUsersSuccess
} from '../actions/extraForUser.actions';
import { switchMap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../state/app.state';
import {of} from 'rxjs';
import {UserService} from '../../services/user.service';
import {User} from '../../interfaces/user';
import {SearchService} from '../../services/search.service';


@Injectable()
export class ExtraForUserEffects {

  @Effect()
  getAllUsers$ = this.actions$.pipe(
    ofType<GetAllUsers>(ExtraForUserActions.GET_USERS),
    switchMap((action: GetAllUsers ) => this.userService.getUsers(action.payload)),
    switchMap((users: User[]) => of(new GetAllUsersSuccess(users)))
  );

  @Effect()
  getSelectedUser$ = this.actions$.pipe(
    ofType<GetSelectedUser>(ExtraForUserActions.GET_SELECTED_USER),
    switchMap((action: GetSelectedUser) => this.userService.getUser(action.payload)),
    switchMap((user: User) => of(new GetSelectedUserSuccess(user)))
  );

  @Effect()
  SearchingUsers$ = this.actions$.pipe(
    ofType<SearchingUsers>(ExtraForUserActions.SEARCH_USER),
    switchMap((action: SearchingUsers ) => this.searchService.search(action.payload)),
    switchMap((users: User[]) => of(new SearchingUsersSuccess(users)))
  );

  constructor(private actions$: Actions,
              private userService: UserService,
              private searchService: SearchService,
              private store: Store<AppState>){}
}
