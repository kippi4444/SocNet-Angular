import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Album} from '../interfaces/album';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private usersAlbum = 'http://localhost:8000/albums/';

  constructor(private http: HttpClient) { }


  createAlbum(formData) {
    return  this.http.post<Album>(this.usersAlbum, formData ).pipe(map(value => value));
  }

  getUserAlbum(id: string) {
    return this.http.get<object>(this.usersAlbum + id).pipe(map(value => value ));
  }

  updateAlbum(obj: {id: string, album: object}) {
    return this.http.put<Album>(this.usersAlbum + obj.id + '/photo', obj.album).pipe(map(value => value));
  }

  deleteAlbum(id: string) {
    return this.http.delete<string>(this.usersAlbum + id).pipe(map(value => value));
  }

  getUserAlbums(id: string) {
    return this.http.get<Album[]>(this.usersAlbum + 'all/' + id).pipe(map(value => value));
  }

}
