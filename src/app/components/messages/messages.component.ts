import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
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


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {
  sub = [];
  routing: Subscription;
  text: string;
  @Input() msgs: dialogMes;
  @Input() user: User;


  constructor(private  store: Store<AppState>) {
  }

  ngOnInit() {
    this.sub.push(this.store.select(getMessage)
      .subscribe(mes => { if (this.msgs) { this.msgs.mes.push(mes); } }));
  }

  sendMes(msg) {
      const message = {
        name: this.user.name,
        user: this.user._id,
        dialog: this.msgs.dialog,
        isReading: true,
        text: msg,
      };
      this.store.dispatch(new SendMes(message));
      this.text = '';

  }


  ngOnDestroy(): void {
    this.sub.forEach(sub => {
      sub.unsubscribe();
    });
    this.sub = [];
  }

}
