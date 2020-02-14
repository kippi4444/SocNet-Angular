import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../interfaces/user';
import {Observable} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';


@Component({

  selector: 'app-login-container',
  template: `<app-login [link] = "link" [regBtn]="btn"  [user]="(user$|async)" (loginEvent)="login($event)" (regEvent)="register($event)"></app-login>`
})
export class LoginContainerComponent implements OnInit{
  private user$: Observable<User>;
  link: string;
  btn: string;
  constructor(private userService: UserService,
              private  route: ActivatedRoute,
              private  router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (this.route.routeConfig.path.indexOf('registration') !== -1) {
        this.link = `/login`;
        this.btn = 'Назад';
        console.log('eee');
      } else {
        this.link = `registration`;
        this.btn = 'Регистрация';
      }

    });
  }


  login(loginData) {
    this.user$ = this.userService.login(loginData);
   }

  register(userData) {
    this.userService.add(userData);
  }

}


