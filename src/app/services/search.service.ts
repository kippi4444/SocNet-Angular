import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {User} from '../interfaces/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private usersUrl = 'http://localhost:8000/users/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService) { }


  search(value: string): Observable<User[]>  {
    return this.http.get<User[]>(this.usersUrl + value);
  }
}
