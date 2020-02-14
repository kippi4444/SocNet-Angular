import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authentificate = new BehaviorSubject(false);
  private login = new BehaviorSubject('');
  private id = new BehaviorSubject('');

  isAuth = this.authentificate.asObservable();
  isLogin = this.login.asObservable();
  isId = this.id.asObservable();
  constructor() { }

  changeAuth(state: boolean) {
    this.authentificate.next(state);
  }

  changeId(id: string) {
    this.id.next(id);
  }

  changeLogin(user: string) {
    this.login.next(user);
  }
}
