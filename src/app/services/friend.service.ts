import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Friend} from '../interfaces/friend';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private friendsUrl = 'http://localhost:8000/friends/';

  constructor(
    private http: HttpClient,
    private router: Router) { }

  addFriend(friend: Friend): Observable<Friend> {
    return  this.http.post<Friend>(this.friendsUrl, friend)
      .pipe(
        map(value => value)
      );
  }

  delReq(id: string) {
    console.log(id);
  return  this.http.delete(this.friendsUrl + 'requests/' + id)
      .pipe(map(value => value));
  }

  delFriend(id: string) {
   return this.http.delete(this.friendsUrl + id)
     .pipe(
       map(value => value)
     );
  }


 getAllFriends(id: string): Observable<Friend[]> {
   return this.http.get<Friend[]>(this.friendsUrl + id)
      .pipe(map(value => value));
  }

  getAllRequests(): Observable<Friend[]> {
   return  this.http.get<Friend[]>(this.friendsUrl + 'requests')
     .pipe(map(value => value));
  }
}
