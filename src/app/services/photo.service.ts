import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Album} from '../interfaces/album';
import {Photo} from '../interfaces/photo';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private photosUrl = 'http://localhost:8000/photos/';
  constructor(    private http: HttpClient,
                  private router: Router ) {

  }

  setAlbumPhoto(id: string, formData: object): Observable<Album> {
    return this.http.post<Album>(this.photosUrl + id, formData);
  }

  deleteAlbumPhoto(photo: Photo) {
    this.http.delete<Album>(this.photosUrl + photo._id).subscribe();
  }

  getAllPhotos(login: string): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.photosUrl + 'all/' + login);
  }

}
