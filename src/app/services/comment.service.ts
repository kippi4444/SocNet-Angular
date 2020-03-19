import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Comments} from '../interfaces/comments';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commnetUrl = 'http://localhost:8000/comment/';

  constructor(private http: HttpClient) { }

  addComment(comment: Comments) {
    return this.http.post<Comments>(this.commnetUrl, comment).pipe(map(value => value));
  }

  delComment(id: string) {
    return this.http.delete(this.commnetUrl + id).pipe(map(value => value));
  }
}
