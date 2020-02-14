import {Injectable} from '@angular/core';
import {Observable,  throwError} from 'rxjs';
import { User } from '../interfaces/user';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
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
  userLogin: string;
  private usersUrl = 'http://localhost:8000/users/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService) { }

  getAuthUser() {

    this.http.get<User[]>(this.usersUrl + 'me')
      .pipe(
        map(user => {
          this.user = user;
          this.authService.changeAuth(true);
          this.authService.changeId(this.user[0]._id);
          this.authService.changeLogin(this.user[0].login);
        }),
        catchError(err => {
          this.logout();
          return throwError(err.error.error);
        })
      ).subscribe();
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.usersUrl + id + '/all')
      .pipe(
        map( user => { return user[0]; } ),
        catchError(err => {
          return throwError(err.error.error);
        })
      );
  }

  add(user: User) {
   this.http.post<Data>(this.usersUrl, user)
     .pipe(
       map((data: Data) => {
         this.writeLocalStorage(data);
         this.router.navigate(['/users/' + data.user.login]);
       })
     ).subscribe();
  }

  login(loginData: User) {
    const body = {login: loginData.login, password: loginData.password};
    return this.http.post<Data>(this.usersUrl + 'login', body)
      .pipe(
        map((data: Data) => {
          this.writeLocalStorage(data);
          this.router.navigate(['/users/' + data.user.login]);
          return data.user;
        })
      );
  }

  logout() {
    this.http.get(this.usersUrl + 'logout').subscribe();
    this.clearLocalStorage();
  }

  del(id: string) {
    this.http.delete<User[]>(this.usersUrl + id).subscribe();
    this.clearLocalStorage();
  }

  update(user: User) {
    this.http.put<Data>(this.usersUrl + user.login, user).subscribe();
  }

  setAvatar(img: object) {
    this.http.put<Data>('http://localhost:8000/photos/' + 'avatar', img).subscribe();
  }



   clearLocalStorage(){
    this.authService.changeAuth(false);
    this.authService.changeId('');
    this.authService.changeLogin('');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('login');
    this.user = null;
  }

   writeLocalStorage(data: Data) {
    localStorage.setItem('accessToken', data.token);
    localStorage.setItem('user', data.user._id);
    localStorage.setItem('login', data.user.login);
    this.authService.changeAuth(true);
    this.authService.changeId(data.user._id);
    this.authService.changeLogin(data.user.login);
  }
  // updateOther(user: User) {
  //   this.http.put<Data>(this.usersUrl + 'update/' + user.login, user).subscribe();
  // }

}
