import {Component, OnInit} from '@angular/core';
import {Msg} from './interfaces/msg';
import {Store} from '@ngrx/store';
import {AppState} from './store/state/app.state';
import {GetAuthUser} from './store/actions/user.actions';
import {searchErrors} from './store/selectors/errors.selector';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})

export class AppComponent implements OnInit {
  accessToken: string = localStorage.getItem('accessToken');
  sub = [];
  isAuth: boolean;
  error: string | object;
  constructor(private store: Store<AppState>) { }
  ngOnInit() {
    this.handlingErrors();
    if (this.accessToken) {
      this.store.dispatch(new GetAuthUser());
    }
  }

  handlingErrors() {
    this.store.select(searchErrors).subscribe(error => {
      console.log(error);
     if ( error) {
      this.error = error;
      setTimeout(() => {this.error = ''} , 5000);
     }
    })
  }

}
