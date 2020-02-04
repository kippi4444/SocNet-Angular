import {Component} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../user';
import {Observable} from 'rxjs';


@Component({

  selector: 'app-login-container',
  template: `<app-login [user]="(user$|async)" (loginEvent)="login($event)"></app-login>`
})
export class LoginContainerComponent{
  private user$: Observable<User>;


  constructor(private userService: UserService) {
  }

  login(loginData) {
    this.user$ = this.userService.login(loginData);
   }
}
