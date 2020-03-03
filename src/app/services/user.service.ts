import {Injectable} from '@angular/core';
import {Observable, of, Subscription, throwError} from 'rxjs';
import { User } from '../interfaces/user';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../store/state/app.state';
import {Photo} from '../interfaces/photo';



export class Data {
  user?: User;
  token?: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  accessToken: string;
  user: User;
  userLogin: string;
  id: string;
  private usersUrl = 'http://localhost:8000/users/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<AppState>) { }

  getAuthUser(): Observable<User> {
    return this.http.get<User>(this.usersUrl + 'me')
      .pipe(
        map(user => {
          return user[0];
        }),
        catchError(err => {
          this.logout();
          return throwError(err);
        })
      );
  }

  getUsers(query?): Observable<User[]> {
    if (query) {
      return this.http.get<User[]>(this.usersUrl, {
        params: query}).pipe(map(users => {
          return users;
        }));
    }
    return this.http.get<User[]>(this.usersUrl).pipe(map(user => {
      return user;
    }));
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.usersUrl + id + '/all')
      .pipe(
        map( user => user[0]),
      );
  }

  add(user: User) {
    return this.http.post<Data>(this.usersUrl, user,{observe: 'response'}).pipe(map(value => value));
  }

  login(loginData: User) {
    const body = {login: loginData.login, password: loginData.password};
    return this.http.post<Data>(this.usersUrl + 'login', body);
  }

  logout() {
   return  this.http.get(this.usersUrl + 'logout', {observe: 'response'});
  }

  del(id: string) {
    return this.http.delete<User[]>(this.usersUrl + id, {observe: 'response'});
  }

  update(user: User) {
    return this.http.put<User>(this.usersUrl + user.login, user, {observe: 'response'});
  }

  setAvatar(img: object) {
    return this.http.put<Photo>('http://localhost:8000/photos/' + 'avatar', img, {observe: 'response'}).pipe(map(value => value));
  }


  // updateOther(user: User) {
  //   this.http.put<Data>(this.usersUrl + 'update/' + user.login, user).subscribe();
  // }

}
