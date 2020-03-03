import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import {Subject, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {WebsocketService} from './services/websocket.service';
import {Msg} from './interfaces/msg';
import {select, Store} from '@ngrx/store';
import {AppState} from './store/state/app.state';
import {GetAuthUser} from './store/actions/user.actions';
import {authentificatedUser, stateAuth} from './store/selectors/user.selector';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})

export class AppComponent implements OnInit {

  accessToken: string = localStorage.getItem('accessToken');
  sub = [];
  isAuth: boolean;
  mes: Msg;
  constructor(private store: Store<AppState>) { }
  ngOnInit() {
    if (this.accessToken) {
      this.store.dispatch(new GetAuthUser());
    }
  }

}
