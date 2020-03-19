import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../interfaces/user';
import {map} from 'rxjs/operators';
import {QuerySearch} from '../interfaces/querySearch';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private usersUrl = 'http://localhost:8000/users/';

  constructor(
    private http: HttpClient) { }

  search(query?: QuerySearch)  {
    return this.http.get<User[]>(this.usersUrl, {
      params:  query}).pipe(map(users => users));
  }
}
