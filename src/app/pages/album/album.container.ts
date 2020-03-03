import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {Album} from '../../interfaces/album';
import {Photo} from '../../interfaces/photo';
import {AppState} from '../../store/state/app.state';
import {Store} from '@ngrx/store';
import {stateAuth} from '../../store/selectors/user.selector';
import {AddPhoto, DelAlbum, DelPhoto, GetSelectedAlbum, UpdAlbum, UpdAlbumSuccess} from '../../store/actions/photo.actions';
import {selectedAlbum} from '../../store/selectors/photo.selector';


@Component({
  selector: 'app-album-container',
  template: `<app-album  [album] = "userAlbum$ | async"
                         [isAuth]="isAuth$ | async"
                         [myId]="id"
                         (deleteAlbum)="deleteAlbum($event)"
                         (uploadPhoto)="uploadPhoto($event)"
                         (deletePhoto)="deletePhoto($event)"
                         (updateAlbum)="updateAlbum($event)"></app-album>`,
  styleUrls: ['./album.component.scss']
})
export class AlbumContainerComponent implements OnInit, OnDestroy {
  isAuth$: Observable<boolean> = this.store.select(stateAuth);
  userAlbum$: Observable<Album> = this.store.select(selectedAlbum);
  id: string = localStorage.getItem('user');
  album: string;
  routing: Subscription;

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.routing = this.route.paramMap.subscribe((params: ParamMap) => {
      this.album = params.get('id') ;

      this.getUserAlbum(this.album);
    });
  }

  getUserAlbum(login: string) {
    this.store.dispatch(new GetSelectedAlbum(login));
  }

  uploadPhoto(file: FormData) {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new AddPhoto({id, file}));
    this.store.dispatch(new GetSelectedAlbum(id));
  }

  ngOnDestroy(): void {
    this.routing.unsubscribe();
  }

  deletePhoto(photo: Photo) {
    this.store.dispatch(new DelPhoto(photo));
  }

  updateAlbum(album: object) {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new UpdAlbum({id, album}));
  }

  deleteAlbum(album: Album) {
    this.store.dispatch(new DelAlbum(album._id));
  }

}
