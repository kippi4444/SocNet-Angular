import {EventEmitter, Injectable, OnInit, Output} from '@angular/core';
import {Observable, of, Subscription, throwError} from 'rxjs';
import { User } from '../user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import { Pet } from '../pet';
import {AuthService} from './auth.service';

export class Data {
  user?: User;
  token?: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  accessToken: string;
  user: User[];
  private usersUrl = 'http://localhost:8000/users/';


  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService) { }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUser(id: string): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl + id + '/pets')
      .pipe(
        catchError(err => {
          localStorage.removeItem('accessToken');
          this.authService.changeAuth(false);
          this.router.navigate(['login']);
          return throwError(err.error.error);
        })
      );
  }

  getMe(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl + 'me')
      .pipe(
        map(user => {
          this.authService.changeAuth(true);
          return user; }),
        catchError(err => {
          localStorage.removeItem('accessToken');
          this.authService.changeAuth(false);
          return throwError(err.error.error);
        })
      );
  }

  add(user: User) {
   this.http.post<Data>(this.usersUrl, user).subscribe();
  }

  update(user: User) {
    this.http.put<Data>(this.usersUrl + user.login, user).subscribe();
  }

  setAvatar(url: object) {
    this.http.put<Data>(this.usersUrl + 'setavatar', url).subscribe();
  }

  login(loginData: User) {
    const body = {login: loginData.login, password: loginData.password};
    return this.http.post<Data>(this.usersUrl + 'login', body)
      .pipe(
        map((data: Data) => {
          this.authService.changeAuth(true);
          localStorage.setItem('accessToken', data.token);
          localStorage.setItem('user', data.user.login);
          this.router.navigate(['/account']);
          return data.user;
        })
      );
  }

  logout() {
    this.http.get(this.usersUrl + 'logout');
    this.authService.changeAuth(false);
    localStorage.removeItem('accessToken');
  }

  del(id: string) {
    this.http.delete<User[]>(this.usersUrl + id).subscribe();
  }

  getAuthUser() {
    this.http.get<User[]>(this.usersUrl + 'me')
      .pipe(
          map(user => {
            this.user = user;
            this.authService.changeAuth(true);
            this.accessToken = localStorage.getItem('accessToken');

          }),
        catchError(err => {
          localStorage.removeItem('accessToken');
          this.authService.changeAuth(false);
          return throwError(err.error.error);
        })
      ).subscribe();
  }

  // updateOther(user: User) {
  //   this.http.put<Data>(this.usersUrl + 'update/' + user.login, user).subscribe();
  // }

}
