import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Pet} from '../interfaces/pet';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Data} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private petsUrl = 'http://localhost:8000/pets/';
  constructor(
    private http: HttpClient,
    private router: Router) { }

  addPet(petData: Pet) {
    return this.http.post<Pet>(this.petsUrl, petData).pipe(map(value => value));
  }

  delPet(id: string) {
    return this.http.delete(this.petsUrl + id)
      .pipe(map(value => value));
  }

  updPet(petData: Pet) {
    console.log(petData);
    this.http.put<Data>(this.petsUrl, petData)
      .pipe(
        catchError(err => {
          console.log(err.error.error);
          return throwError(err.error.error);
        })
      ).subscribe();
  }
}
