import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {WebsocketService} from '../../services/websocket.service';
import {map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {dialogMes, DialogService} from '../../services/dialog.service';
import {Msg} from '../../interfaces/msg';
import {User} from '../../interfaces/user';
import {AppState} from '../../store/state/app.state';
import {select, Store} from '@ngrx/store';
import {authentificatedUser, selectedDialog} from '../../store/selectors/user.selector';
import {GetSelectedDialog} from '../../store/actions/user.actions';



@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {
  sub = [];
  routing: Subscription;
  text: string;
  dialogId: string;
  msgs: Msg[];
  messages: Subject<any>;
  myId: string = localStorage.getItem('user');
  user: User;

  constructor(private  webSocketService: WebsocketService,
              private  store: Store<AppState>,
              private  dialogService: DialogService,
              private  route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.routing) {this.routing.unsubscribe(); }
    this.routing = this.route.paramMap.subscribe(next => {
      this.dialogId = this.route.snapshot.paramMap.get('id');
      this.store.dispatch(new GetSelectedDialog(this.dialogId));
      this.messagesService();
    });
  }

  messagesService() {
      if (this.sub.length > 0 ) {
        this.sub.forEach(sub => {
          sub.unsubscribe();
        });
        this.sub = [];
      }
      this.getAllMessages();
  }

  getAllMessages() {

    this.sub.push(this.store.select(selectedDialog).subscribe(dialog  => {
      if (dialog) {
        this.msgs = dialog.mes;
        const session = {
          dialog: dialog.dialog,
          sender: this.myId,
        };
        this.preConnect(session);
      }
    }));
  }

  preConnect(session) {
    this.connectChat(session);
    this.sub.push(this.messages.subscribe(msg => {
      this.msgs.push(msg);
    }));
  }

  connectChat(session) {this.messages = this.webSocketService
  .connect(session)
  .pipe(
    map(res => {
      return res;
    })
  ) as Subject<any>;
  }


  sendMes(msg) {
    this.sub.push(this.store.select(authentificatedUser).subscribe(user => this.user = user));
    const message = {
      name: this.user.name,
      user: this.user._id,
      dialog: this.dialogId,
      isReading: true,
      text: msg,
    };
    this.messages.next(message);
    this.text = '';
  }

  ngOnDestroy(): void {
    this.sub.forEach(sub => {
      sub.unsubscribe();
    });
    this.sub = [];
    this.routing.unsubscribe();
  }

}
