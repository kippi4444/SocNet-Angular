import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../interfaces/user';
import {Observable} from 'rxjs';



@Component({

  selector: 'app-login-container',
  template: `<app-login  [user]="(user$|async)"
                         (loginEvent)="login($event)"
                         (regEvent)="register($event)"></app-login>`
})
export class LoginContainerComponent implements OnInit{
  private user$: Observable<User>;
  constructor(private userService: UserService) {}

  ngOnInit(): void {

  }


  login(loginData) {
    this.user$ = this.userService.login(loginData);
   }

  register(userData) {

    this.userService.add(userData);
  }

}


