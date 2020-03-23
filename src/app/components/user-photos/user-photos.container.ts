import {Component,  OnDestroy, OnInit} from '@angular/core';
import {Photo} from '../../interfaces/photo';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {authentificatedUser, stateAuth} from '../../store/selectors/user.selector';
import {AddPhotoWall, DelPhoto, GetAllPhotos} from '../../store/actions/photo.actions';
import {allPhotos} from '../../store/selectors/photo.selector';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-user-photos-container',
  template: `
      <app-user-photos [link]="link"
                       [limit]="limit"
                       [photos]="userPhotos"
                       [isAuth]="isAuth$ | async"
                       [authUser]="authUser | async"
                       (upldPhoto)="uploadPhoto($event)"
                       (deletePhoto)="deletePhoto($event)"></app-user-photos>`,
  styleUrls: ['./user-photos.component.scss']
})
export class UserPhotosContainerComponent implements OnInit, OnDestroy {
  limit: boolean;
  authUser: Observable<User> = this.store.select(authentificatedUser);
  isAuth$: Observable<boolean> = this.store.select(stateAuth);
  sub: Subscription;
  routing: Subscription;
  photos: any;
  link: string;
  userPhotos: Photo[];
  constructor(private route: ActivatedRoute,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.getUserPhotos();
  }

  getUserPhotos() {
    this.routing = this.route.paramMap.subscribe((params: ParamMap) => {
      const login = this.route.snapshot.paramMap.get('id');
      this.store.dispatch(new GetAllPhotos(login));
      this.limit = this.route.routeConfig.path.indexOf('albums') === -1;
      this.link = this.limit ? 'albums' : `/users/${login}`;
      this.sub = this.store.select(allPhotos).subscribe(
        photos => {
          this.userPhotos = this.limit ? photos.slice(0, 4) : photos;
        });
    });
  }

  deletePhoto(photo: Photo) {
    this.store.dispatch(new DelPhoto(photo));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.routing.unsubscribe();
  }

  uploadPhoto(photo: FormData) {
    this.store.dispatch(new AddPhotoWall(photo));
  }

}
