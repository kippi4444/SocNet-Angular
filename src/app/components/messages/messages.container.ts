import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Observer, Subscription} from 'rxjs';
import {WebsocketService} from '../../services/websocket.service';
import {ActivatedRoute} from '@angular/router';
import {dialogMes, DialogService} from '../../services/dialog.service';
import {Msg} from '../../interfaces/msg';
import {User} from '../../interfaces/user';
import {AppState} from '../../store/state/app.state';
import {Store} from '@ngrx/store';
import {authentificatedUser, selectedDialog} from '../../store/selectors/user.selector';
import {GetSelectedDialog} from '../../store/actions/user.actions';
import {DialogConnectSocket, DialogDisconnect, GetMes, SendMes} from '../../store/actions/message.actions';
import {getMessage} from '../../store/selectors/message.selector';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-messages-container',
  template: `<app-messages
          [msgs] = 'msgs$ | async'
          [user] = 'user$ | async'
  ></app-messages>`,
  styleUrls: ['./messages.component.scss']
})
export class MessagesContainerComponent implements OnInit, OnDestroy {
  sub = [];
  routing: Subscription;
  text: string;
  dialogId: string;
  user$: Observable<User> = this.store.select(authentificatedUser);
  msgs$: Observable<dialogMes> = this.store.select(selectedDialog);
  myId: string = localStorage.getItem('user');
  user: User;

  constructor(private  store: Store<AppState>,
              private  route: ActivatedRoute) {
  }

  ngOnInit() {
    this.routing = this.route.paramMap.subscribe(next => {
      this.dialogId = this.route.snapshot.paramMap.get('id');
      this.store.dispatch(new GetSelectedDialog(this.dialogId));
      this.connect();
    });
  }

  connect() {
    this.store.dispatch(new DialogDisconnect());
    const session = {
      dialog: this.dialogId,
      sender: this.myId,
    };
    this.sub.push(this.user$.subscribe(value => {
      if (value) {
        this.store.dispatch(new DialogConnectSocket(session));
      }
    }));

    this.store.dispatch(new GetMes());
  }


  ngOnDestroy(): void {
    this.routing.unsubscribe();
    this.store.dispatch(new DialogDisconnect());
  }

}
