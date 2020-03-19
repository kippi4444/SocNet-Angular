import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../state/app.state';

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
import {FriendService} from '../../services/friend.service';
import {AddFriendsUserListSuccess, DelFriendsFromUserListSuccess, DelRequestFromUserListSuccess} from '../actions/extraForUser.actions';
import {Friend} from '../../interfaces/friend';
import {GetError} from '../actions/errors.actions';


@Injectable()
export class FriendshipEffects {

  @Effect()
  getAllFriends$ = this.actions$.pipe(
    ofType<GetAllFriends>(FriendshipUserActions.GET_ALL_FRIENDS),
    switchMap((action: GetAllFriends ) => this.friendService.getAllFriends(action.payload)
      .pipe(
        map((users: Friend[]) => new GetAllFriendsSuccess(users)),
        catchError((err) => [new GetAllFriendsFailure(err), new GetError(err)])
      )
    )
  );

  @Effect()
  getAllRequests$ = this.actions$.pipe(
    ofType<GetAllRequests>(FriendshipUserActions.GET_ALL_REQUEST),
    switchMap(() => this.friendService.getAllRequests()
      .pipe(
        map((req: Friend[]) => new GetAllRequestsSuccess(req)),
        catchError((err) => [new GetAllRequestsFailure(err), new GetError(err)])
      )
    )
  );

  @Effect()
  addFriend$ = this.actions$.pipe(
    ofType<AddFriend>(FriendshipUserActions.ADD_FRIEND),
    switchMap((action: AddFriend) => this.friendService.addFriend(action.payload)
      .pipe(
        switchMap((friend: Friend ) => [new AddFriendSuccess(friend), new AddFriendsUserListSuccess(friend) ]),
        catchError((err) => [new AddFriendFailure(err), new GetError(err)])
      )
    )
  );

  @Effect()
  delFriend$ = this.actions$.pipe(
    ofType<DelFriend>(FriendshipUserActions.DEL_FRIEND),
    switchMap((action: DelFriend) => this.friendService.delFriend(action.payload)
      .pipe(
        switchMap((req: {friend: string, auth: string} ) => [new DelFriendSuccess(req.friend), new DelFriendsFromUserListSuccess(req)]),
        catchError((err) => [new DelFriendFailure(err), new GetError(err)])
      )
    )
  );

  @Effect()
  delReq$ = this.actions$.pipe(
    ofType<DelRequest>(FriendshipUserActions.DEL_REQUEST),
    switchMap((action: DelRequest) => this.friendService.delReq(action.payload)
      .pipe(
        switchMap((friend: string ) => [new DelRequestSuccess(friend), new DelRequestFromUserListSuccess(friend)]),
        catchError((err) => [new DelRequestFailure(err), new GetError(err)])
      )
    )
  );

  constructor(private actions$: Actions,
              private friendService: FriendService,
              private store: Store<AppState>) {}
}
