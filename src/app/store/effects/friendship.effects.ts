import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../state/app.state';
import {of} from 'rxjs';

import {
  AddFriend,
  AddFriendFailure,
  AddFriendSuccess,
  DelFriend,
  DelFriendFailure,
  DelFriendSuccess,
  DelRequest,
  DelRequestFailure,
  DelRequestSuccess,
  FriendshipUserActions,
  GetAllFriends, GetAllFriendsFailure,
  GetAllFriendsSuccess,
  GetAllRequests, GetAllRequestsFailure,
  GetAllRequestsSuccess
} from '../actions/friendship.actions';
import {Friend} from '../../interfaces/friend';
import {FriendService} from '../../services/friend.service';
import {allRequests} from '../selectors/friendship.selector';
import {AddFriendsUser, ExtraForUserActions, GetSelectedUser} from '../actions/extraForUser.actions';


@Injectable()
export class FriendshipEffects {

  @Effect()
  getAllFriends$ = this.actions$.pipe(
    ofType<GetAllFriends>(FriendshipUserActions.GET_ALL_FRIENDS),
    switchMap((action: GetAllFriends ) => this.friendService.getAllFriends(action.payload)),
    map((users: Friend[]) => new GetAllFriendsSuccess(users)),
    catchError((err) => of(new GetAllFriendsFailure(err)))
  );

  @Effect()
  getAllRequests$ = this.actions$.pipe(
    ofType<GetAllRequests>(FriendshipUserActions.GET_ALL_REQUEST),
    switchMap(() => this.friendService.getAllRequests()),
    map((req: Friend[]) => new GetAllRequestsSuccess(req)),
    catchError((err) => of(new GetAllRequestsFailure(err)))
  );

  @Effect()
  addFriend$ = this.actions$.pipe(
    ofType<AddFriend>(FriendshipUserActions.ADD_FRIEND),
    switchMap((action: AddFriend) => this.friendService.addFriend(action.payload)),
    map((friend: Friend ) => new AddFriendSuccess(friend)),
    catchError((err) => of(new AddFriendFailure(err)))
  );

  @Effect()
  delFriend$ = this.actions$.pipe(
    ofType<DelFriend>(FriendshipUserActions.DEL_FRIEND),
    switchMap((action: DelFriend) => this.friendService.delFriend(action.payload)),
    map((friend: string ) => new DelFriendSuccess(friend)),
    catchError((err) => of(new DelFriendFailure(err)))
  );

  @Effect()
  delReq$ = this.actions$.pipe(
    ofType<DelRequest>(FriendshipUserActions.DEL_REQUEST),
    switchMap((action: DelRequest) => this.friendService.delReq(action.payload)),
    map((friend: string ) => new DelRequestSuccess(friend)),
    catchError((err) => of(new DelRequestFailure(err)))
  );

  constructor(private actions$: Actions,
              private friendService: FriendService,
              private store: Store<AppState>){}
}
