import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../state/app.state';
import {of} from 'rxjs';
import {UserService} from '../../services/user.service';
import {
  DialogConnectSocket,
  DialogConnectSocketFailure,
  DialogDisconnect,
  GetMes,
  GetMesFailure,
  GetMesSuccess,
  GetNotification, GetNotificationFailure,
  GetNotificationSuccess,
  MainConnectSocket,
  MessageActions,
  SendMes,
  SendMesFailure, SendNotification
} from '../actions/message.actions';
import {WebsocketService} from '../../services/websocket.service';
import {GetSelectedDialogSuccess, MesReadSuccess, UpDialogInListSuccess} from '../actions/user.actions';
import {authentificatedUser} from '../selectors/user.selector';
import {LikeDislikeEventSuccess, LikeDislikePhotoSuccess} from '../actions/photo.actions';
import {Msg} from '../../interfaces/msg';
import {User} from '../../interfaces/user';


@Injectable()
export class MessageEffects {

  @Effect()
  getMes$ = this.actions$.pipe(
    ofType<GetMes>(MessageActions.GET_MES),
    switchMap(() => this.socketService.getMes()),
    withLatestFrom(this.store.select(authentificatedUser)),
    switchMap(([mes, user]) => {
      return [new GetMesSuccess(mes),  new MesReadSuccess({mes, user})]}),
    catchError((err) => of(new GetMesFailure(err)))
  );

  @Effect({dispatch: false})
  sendMes$ = this.actions$.pipe(
    ofType<SendMes>(MessageActions.SEND_MES),
    map((action: SendMes) => this.socketService.sendMes(action.payload)),
    catchError((err) => of(new SendMesFailure(err)))
  );

  @Effect({dispatch: false})
  sendNotification$ = this.actions$.pipe(
    ofType<SendNotification>(MessageActions.SEND_NOTIFICATIONS),
    map((action: SendNotification) => this.socketService.sendNotification(action.payload)),
    catchError((err) => of(new SendMesFailure(err)))
  );

  @Effect()
  notification$ = this.actions$.pipe(
    ofType<GetNotification>(MessageActions.NOTIFICATIONS),
    switchMap(() => this.socketService.notification()),
    switchMap((mes: {event: string, mes: Msg, like?: User } ) => {
      switch (mes.event) {
        case 'joinDialog': {
          return of(new MesReadSuccess(mes));
        }
        case 'newLike': {
          return [new LikeDislikeEventSuccess(mes), new GetNotificationSuccess(mes)];
        }
        case 'yourLike': {
          return of(new LikeDislikePhotoSuccess(mes));
        }
        case 'isRead': {
          return of(new GetSelectedDialogSuccess(mes));
        }
        case 'newMes': {
          return [new GetNotificationSuccess(mes), new UpDialogInListSuccess(mes)];
        }
        default:
          return of(new GetNotificationSuccess(mes));
      }
    }),
    catchError((err) => of(new GetNotificationFailure(err)))
  );

  @Effect({dispatch: false})
  connectMainSocket$ = this.actions$.pipe(
    ofType<MainConnectSocket>(MessageActions.MAIN_CONNECT_SOCKET),
    map((action: MainConnectSocket) => this.socketService.mainConnect(action.payload)),
    catchError(err => err)
  );

  @Effect({dispatch: false})
  connectDialogSocket$ = this.actions$.pipe(
    ofType<DialogConnectSocket>(MessageActions.DIALOG_CONNECT_SOCKET),
    map((action: DialogConnectSocket ) => this.socketService.dialogConnect(action.payload)),
    catchError(err => of(new DialogConnectSocketFailure()))
  );

  @Effect({dispatch: false})
  disconnectDialogSocket$ = this.actions$.pipe(
    ofType<DialogDisconnect>(MessageActions.DIALOG_DISCONNECT_SOCKET),
    map((action: DialogDisconnect) => this.socketService.dialogDisconnect()),
    catchError(err => err)
  );

  @Effect({dispatch: false})
  disconnectMainSocket$ = this.actions$.pipe(
    ofType<DialogDisconnect>(MessageActions.MAIN_DISCONNECT_SOCKET),
    map(() => this.socketService.mainDisconnect()),
    catchError(err => err)
  );
  constructor(private actions$: Actions,
              private userService: UserService,
              private socketService: WebsocketService,
              private store: Store<AppState>) {}
}
