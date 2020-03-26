import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {AppState} from '../store/state/app.state';
import {GetAllUsers} from '../store/actions/extraForUser.actions';
import {allUsers} from '../store/selectors/extraForUser.selector';
import {User} from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  users$: Observable<User[]> = this.store.select(allUsers);
  allUsers: User[];
  constructor(private store: Store<AppState>) {
    this.store.dispatch(new GetAllUsers());
  }

  validateLogin(userName: string): Observable<ValidationErrors> {
    return new Observable<ValidationErrors>(observer => {
      this.users$.subscribe(users => {
        this.allUsers = users;
      });
      const user = this.allUsers.find(usr => usr.login === userName);
      if (user) {
        observer.next({
          loginError: 'Пользователь с таким именем уже существует'
        });
        observer.complete();
      }

      observer.next(null);
      observer.complete();
    });
  }
}
