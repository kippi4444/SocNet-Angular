import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../state/app.state';
import {of, Subject} from 'rxjs';
import {UserService} from '../../services/user.service';
import * as io from 'socket.io-client';
import * as Rx from 'rxjs';
import { Observable } from 'rxjs';
import {
  DialogConnectSocket,
  DialogConnectSocketFailure,
  DialogConnectSocketSuccess, DialogDisconnect,
  GetMes,
  GetMesFailure,
  GetMesSuccess,
  GetNotification, GetNotificationFailure,
  GetNotificationSuccess,
  MainConnectSocket,
  MainConnectSocketFailure,
  MainConnectSocketSuccess,
  MessageActions,
  SendMes,
  SendMesFailure,
  SendMesSuccess, SendNotification
} from '../actions/message.actions';
import {WebsocketService} from '../../services/websocket.service';
import {environment} from '../../../environments/environment';
import {log} from 'util';
import {Msg} from '../../interfaces/msg';


@Injectable()
export class MessageEffects {

  @Effect()
  getMes$ = this.actions$.pipe(
    ofType<GetMes>(MessageActions.SEND_MES),
    switchMap(() => this.socketService.getMes()),
    switchMap((mes: Msg ) => of(new GetMesSuccess(mes))),
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
    switchMap((mes: Msg ) => of(new GetNotificationSuccess(mes))),
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
    catchError(err => err)
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
              private store: Store<AppState>){}
}
