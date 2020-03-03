import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Album} from '../interfaces/album';
import {Photo} from '../interfaces/photo';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private photosUrl = 'http://localhost:8000/photos/';
  constructor(    private http: HttpClient,
                  private router: Router ) {

  }

  setAlbumPhoto(photo: {id: string, file: FormData}) {
    return this.http.post<Photo[]>(this.photosUrl + photo.id, photo.file).pipe(map(value => value));
  }

  setWallPhoto(formData: object) {
    return this.http.post<Photo[]>(this.photosUrl + 'wall', formData).pipe(map(value => value));
  }

  deleteAlbumPhoto(photo: Photo) {
    return this.http.delete<string>(this.photosUrl + photo._id).pipe(map(value => value));
  }

  getAllPhotos(login: string) {
    return this.http.get<Photo[]>(this.photosUrl + 'all/' + login).pipe(map(value => value));
  }

  movePhoto(obj) {
   return  this.http.put(this.photosUrl + 'upd', obj).pipe(map(value => value));
  }
}
