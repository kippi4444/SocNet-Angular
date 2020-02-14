import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {Album} from '../interfaces/album';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Photo} from '../interfaces/photo';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private usersAlbum = 'http://localhost:8000/albums/';
  private usersPhoto = 'http://localhost:8000/photos/';

  constructor(    private http: HttpClient,
                  private router: Router,
                  private authService: AuthService) { }


  createAlbum(formData) {
    return  this.http.post<Album>(this.usersAlbum, formData );
  }

  getUserAlbum(id: string): Observable<Album> {
    return this.http.get<Album>(this.usersAlbum + id).pipe(map(value => { return value[0] }));
  }



  updateAlbum(id: string, album: object) {
    this.http.put<Album>(this.usersAlbum + id + '/photo', album).subscribe();
  }

  deleteAlbum(id: string) {
    this.http.delete<Album>(this.usersAlbum + id).subscribe();
  }

  getUserAlbums(id: string): Observable<Album[]> {
    return this.http.get<Album[]>(this.usersAlbum + 'all/' + id).pipe(map(albums => {return albums}));
  }



}
