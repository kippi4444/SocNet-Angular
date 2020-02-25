import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {WebsocketService} from '../../services/websocket.service';
import {map} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import {DialogService} from '../../services/dialog.service';
import {Msg} from '../../interfaces/msg';
import {User} from '../../interfaces/user';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {
  sub: Subscription;
  text: string;
  dialog: string;
  msgs: Msg[];
  messages: Subject<any>;
  myId: string;
  user: User;

  constructor(private  webSocketService: WebsocketService,
              private  userService: UserService,
              private  dialogService: DialogService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.myId = this.userService.id;
    this.route.paramMap.subscribe(next => {
      if (this.sub) {
        this.sub.unsubscribe();
      }
      this.dialog = this.route.snapshot.paramMap.get('id');
      this.getAllMessages();
      const session = {
        nameSpace: this.dialog,
        sender: this.myId,
      };
      this.connectChat(session);
      this.sub = this.messages.subscribe(msg => {
        this.msgs.push(msg);
      });
    });
  }

  connectChat(session) {this.messages = <Subject<any>> this.webSocketService
  .connect(session)
  .pipe(
    map(res => {
      return res;
    })
  );
  }

  getAllMessages() {
    this.dialogService.getMessages(this.dialog).subscribe(msgs => this.msgs = msgs);
  }

  sendMes(msg) {
    this.user = this.userService.user;
    console.log(this.user);
    const message = {
      name: this.user.name,
      user: this.myId,
      dialog: this.dialog,
      isReading: true,
      text: msg,
    };
    this.messages.next(message);
    this.text ='';
    this.getAllMessages();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
