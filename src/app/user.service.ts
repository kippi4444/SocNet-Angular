import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable, of, Subscription, throwError} from 'rxjs';
import { User } from './user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

export class Data {
  user?: User;
  token?: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  accessToken: string;
  isAuth: boolean;
  private usersUrl = 'http://localhost:8000/users/';

  constructor(
    private http: HttpClient,
    private router: Router) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUser(id: string): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl + id);
  }

  getMe(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl + 'me').pipe(map(user => { this.isAuth = true;
                                                                          return user; }));
  }

  add(user: User) {
   this.http.post<Data>(this.usersUrl, user).subscribe();
  }

  update(user: User) {
    const id = user.login;
    this.http.put<Data>(this.usersUrl + id, user).subscribe();
  }

  updateOther(user: User) {
    this.http.put<Data>(this.usersUrl + 'update/' + user.login, user).subscribe();
  }

  login(loginData: User) {
    const body = {login: loginData.login, password: loginData.password};
    return this.http.post<Data>(this.usersUrl + 'login', body)
      .pipe(
        map((data: Data) => {
          this.isAuth = true;
          localStorage.setItem('accessToken', data.token);
          this.router.navigate(['/account']);
          return data.user;
        }),
        catchError(err => {
          console.log(err.error.error);
          return throwError(err.error.error);
        })
      );
  }

  logout() {
    this.http.get(this.usersUrl + 'logout');
    localStorage.removeItem('accessToken');
  }

  del(id: string) {
    this.http.delete<User[]>(this.usersUrl + id).subscribe();
  }

  getAuthUser() {
      return this.isAuth;
  }

}
