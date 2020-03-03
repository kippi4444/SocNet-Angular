import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../interfaces/user';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private usersUrl = 'http://localhost:8000/users/';

  constructor(
    private http: HttpClient) { }


  search(value: string)  {
    return this.http.get<User[]>(this.usersUrl + value).pipe(map(users => users));
  }
}
