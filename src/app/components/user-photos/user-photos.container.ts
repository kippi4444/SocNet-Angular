import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Photo} from '../../interfaces/photo';
import {ActivatedRoute} from '@angular/router';
import {PhotoService} from '../../services/photo.service';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/state/app.state';
import {stateAuth} from '../../store/selectors/user.selector';
import {AddPhotoWall, DelPhoto, GetAllPhotos} from '../../store/actions/photo.actions';
import {allPhotos} from '../../store/selectors/photo.selector';

@Component({
  selector: 'app-user-photos-container',
  template: `<app-user-photos [link] = "link"
                              [limit] = "limit"
                              [photos] = "userPhotos"
                              [isAuth]="isAuth$ | async"
                              [myId]="id"
                              (upldPhoto)="uploadPhoto($event)"
                              (deletePhoto)="deletePhoto($event)"></app-user-photos>`,
  styleUrls: ['./user-photos.component.scss']
})
export class UserPhotosContainerComponent implements OnInit, OnDestroy {
  @Output() reloadComponent: EventEmitter<void> = new EventEmitter<void>();
  @Input() limit: boolean;
  @Input() link: string;
  id: string = localStorage.getItem('user');
  isAuth$: Observable<boolean> = this.store.select(stateAuth);
  sub: Subscription;
  photos: any;
  userPhotos: Photo[];
  constructor(private route: ActivatedRoute,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.getUserPhotos();
  }

  getUserPhotos() {
    const photoId = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new GetAllPhotos(photoId));
    this.sub = this.store.select(allPhotos).subscribe(
      photos => {
        this.userPhotos = this.limit ? photos.slice(0 , 4) : photos;
      });
  }

  deletePhoto(photo: Photo) {
    this.store.dispatch(new DelPhoto(photo));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  uploadPhoto(photo: FormData) {
    this.store.dispatch(new AddPhotoWall(photo));
  }

}
