import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {authentificatedUser} from '../../store/selectors/user.selector';
import {GetLoginUser, NewUser} from '../../store/actions/user.actions';



@Component({

  selector: 'app-login-container',
  template: `<app-login  [user]="(user$|async)"
                         (loginEvent)="login($event)"
                         (regEvent)="register($event)"></app-login>`
})
export class LoginContainerComponent implements OnInit{
  private user$ = this.store.pipe(select(authentificatedUser));

  constructor(private userService: UserService,
              private store: Store<AppState>) {}

  ngOnInit(): void {

  }


  login(loginData) {
    this.store.dispatch(new GetLoginUser(loginData));
   }

  register(userData) {
    this.store.dispatch(new NewUser(userData));
    // this.userService.add(userData);
  }

}


