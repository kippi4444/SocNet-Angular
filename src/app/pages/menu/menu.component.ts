import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {authentificatedUser, stateAuth} from '../../store/selectors/user.selector';
import {GetLogoutUser} from '../../store/actions/user.actions';
import {GetNotification, MainConnectSocket, MainDisconnect} from '../../store/actions/message.actions';
import {getNotification} from '../../store/selectors/message.selector';
import {transition, trigger, useAnimation} from '@angular/animations';
import {fadeInUp} from 'ng-animate';




@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('getNotification', [
      transition(':enter', [
        useAnimation(fadeInUp)
      ]),
    ])]

})
export class MenuComponent implements OnInit, OnDestroy {
  isAuth: boolean;
  login: string;
  sub = [];
  notif: any ;

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
        this.notif = notif;
        setTimeout(() => {
          this.notif = null;
        },  5000);

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
    this.notif = null;
  }
}
