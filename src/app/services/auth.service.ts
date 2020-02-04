import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authentificate = new BehaviorSubject(false);
  isAuth = this.authentificate.asObservable();
  constructor() { }

  changeAuth(state: boolean) {
    this.authentificate.next(state);
  }
}
