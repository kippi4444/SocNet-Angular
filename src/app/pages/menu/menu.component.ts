import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {authentificatedUser, stateAuth} from '../../store/selectors/user.selector';
import {GetLogoutUser} from '../../store/actions/user.actions';
import {Msg} from '../../interfaces/msg';
import {GetNotification, MainConnectSocket, MainDisconnect} from '../../store/actions/message.actions';
import {getNotification} from '../../store/selectors/message.selector';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  isAuth: boolean;
  login: string;
  sub = [];
  mes: Msg;

  constructor(private store: Store<AppState>) { }

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
  }


  notificationService() {
    const session = {
      sender: localStorage.getItem('user')
    };

    this.store.dispatch(new MainConnectSocket(session));
    this.store.dispatch(new GetNotification());
    this.store.select(getNotification).subscribe(notif => {
      if (notif !== null) {
        switch (notif.event) {
          case 'addFriend':
            this.mes = notif.mes;
            this.mes.text = 'У Вас новая завяка в друзья';
            return this.mes;
          case 'delFriend':
            this.mes = notif.mes;
            this.mes.text = 'Вас удалили из друзей';
            return this.mes;
          case 'newFriend':
            this.mes = notif.mes;
            this.mes.text = 'Вас добавили в друзья!';
            return this.mes;
          case 'newMes':
            this.mes = notif.mes;
            console.log(this.mes);
            return this.mes;
        }
        function timer() {
          setTimeout(() => {
            this.mes = null;
          },  5000);
        }
        timer();
      }
    });
  }


  ngOnDestroy(): void {
    this.store.dispatch(new MainDisconnect());
    this.sub.forEach(el => {
      el.unsubscribe();
    });
    this.sub = [];
  }

  close() {
    this.mes = null;
  }
}
