import {Component, OnDestroy, OnInit} from '@angular/core';
import {Dialog} from '../../interfaces/dialog';
import {UserService} from '../../services/user.service';
import {DialogService} from '../../services/dialog.service';
import {FriendService} from '../../services/friend.service';
import {Friend} from '../../interfaces/friend';
import {User} from '../../interfaces/user';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Msg} from '../../interfaces/msg';
import {WebsocketService} from '../../services/websocket.service';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit, OnDestroy {
  id: string;
  dialogs: Dialog[];
  friends: Friend[];
  activeDialog: string;
  sub = [];
  login: string;
  messages: Subject<any>;

  constructor(private userService: UserService,
              private dialogService: DialogService,
              private friendService: FriendService,
              private  webSocketService: WebsocketService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.userService.id;
    this.login = this.userService.userLogin;
    this.activeDialog = this.route.snapshot.children.length > 0 ?  this.route.snapshot.children[0].params.id : '';
    this.getAllDialogs();
    this.getAllFriends();
  }

  startChatService(){
    this.route.paramMap.subscribe(next => {
      if (this.sub) {
        this.sub.forEach( el => {el.unsubscribe()});
      }
      const session = {
        nameSpace: this.dialogs,
        sender: this.id,
      };
      this.connectChat(session);
      this.sub.push(this.messages.subscribe(msg => {
        console.log(msg);
      }));
    });
  }


  connectChat(session) {this.messages = <Subject<any>> this.webSocketService
    .generalConnect(session)
    .pipe(
      map(res => {
        return res;
      })
    );
  }

  getAllDialogs() {
    this.sub.push(this.dialogService.getAllDialogs().subscribe(value => {this.dialogs = value; this.startChatService();}));
  }

  getAllFriends() {
    this.sub.push( this.friendService.getAllFriends(this.login).subscribe(value => this.friends = value));
  }

  goToDialog(user: User) {
    const body = { person: [
        {id: user._id},
        {id: this.id}
      ]
    };
    this.sub.push( this.dialogService.addDialog(body).subscribe(value => {
      this.activeDialog = value._id;
      this.router
        .navigate([`/dialogs/${value._id}`], { queryParams: {to: user.login}});
    }));
  }

  ngOnDestroy(): void {
    this.sub.forEach( el => {el.unsubscribe()});
  }
}
