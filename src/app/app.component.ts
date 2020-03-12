import {Component, OnInit} from '@angular/core';
import {Msg} from './interfaces/msg';
import {Store} from '@ngrx/store';
import {AppState} from './store/state/app.state';
import {GetAuthUser} from './store/actions/user.actions';


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
