import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  isAuth: boolean;
  login: string;
  sub = [];
  constructor(private authService: AuthService,
              private userService: UserService) { }

  ngOnInit() {
    this.login = this.userService.userLogin;
    this.sub.push(this.authService.isAuth.subscribe(state => { this.isAuth = state;}));
    this.sub.push(this.authService.isLogin.subscribe(state => { this.login = state;}));
  }

  LogoutUser() {
    this.userService.logout();
  }

  ngOnDestroy(): void {
    this.sub.forEach(el => {
      el.unsubscribe();
    })
  }

}
