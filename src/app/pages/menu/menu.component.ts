import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {authentificatedUser, stateAuth} from '../../store/selectors/user.selector';
import {GetAuthUser, GetLogoutUser} from '../../store/actions/user.actions';
import {map} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';
import {Msg} from '../../interfaces/msg';
import {WebsocketService} from '../../services/websocket.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  isAuth: boolean;
  login: string;
  sub = [];
  messages: Subject<any>;
  chat: Subscription;
  mes: Msg;
  id: string;
  constructor(private store: Store<AppState>,
              private webSocketService: WebsocketService) { }

  ngOnInit() {
    this.sub.push(this.store.select(stateAuth).subscribe(state => this.isAuth = state));
    this.sub.push(this.store.select(authentificatedUser).subscribe(state =>  {
      if (state) {
        this.login = state.login;
        this.notificationService();
      }
    }));

  }

  LogoutUser() {
    this.store.dispatch(new GetLogoutUser());
    this.chat.unsubscribe();
  }


  notificationService() {
    const session = {
      sender: localStorage.getItem('user')
    };
    this.connectChat(session);
    this.chat = this.messages.subscribe(msg => {
      this.mes = msg;
      setTimeout(() => {
        this.mes = null;
      },  5000);
    });
  }

  connectChat(session) {this.messages = this.webSocketService
    .generalConnect(session)
    .pipe(
      map(res => {
        return res;
      })
    ) as Subject<any>;
  }

  ngOnDestroy(): void {
    this.sub.forEach(el => {
      el.unsubscribe();
    });
    this.sub = [];
  }
}
