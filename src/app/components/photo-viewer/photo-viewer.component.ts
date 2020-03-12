import {Component, EventEmitter,  OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute,  Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {Photo} from '../../interfaces/photo';
import {Album} from '../../interfaces/album';
import {AppState} from '../../store/state/app.state';
import {Store} from '@ngrx/store';
import {allAlbums, allPhotos,  selectedAlbumPhoto} from '../../store/selectors/photo.selector';
import {ChangePhotoAlbum, DelPhoto} from '../../store/actions/photo.actions';
import {ChangeAvatar} from '../../store/actions/user.actions';


@Component({
  selector: 'app-photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.scss']
})
export class PhotoViewerComponent implements OnInit, OnDestroy {
  myId: Observable<string> = this.store.select(state => state.users.authUser._id);
  photos: Photo[];
  targetPhoto: Photo;
  photoId: string;
  show: boolean;
  prev: string;
  next: string;
  idx: number;
  move = false;
  userAlbums$: Observable<Album[]>;
  serv: Subscription;
  routing: Subscription;
  edit = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.userAlbums$ = this.store.select(allAlbums);
    this.urlSubscriber();
  }

  urlSubscriber() {
    this.route.url.subscribe(next => {
      if (next[0].path === 'users') {
        this.getAllUserPhotos();
      }
      if (next[0].path === 'album') {
        this.getUserAlbum();
      }
    });
  }

  getAllUserPhotos(){
    this.serv = this.store.select(allPhotos).subscribe(photos => {
      this.photos = photos;
      this.routingStart();
    });
  }

  getUserAlbum() {
    this.serv = this.store.select(selectedAlbumPhoto).subscribe(album => {
      this.photos = album;
      this.routingStart();
    });
  }

  routingStart() {
   this.routing = this.route.queryParams.pipe(filter(params => params.photo)).subscribe(params => {
      this.photoId = params.photo;
      this.targetPhoto = this.photos.filter(photo => photo._id === this.photoId)[0];
      this.show = true;
      this.photoLister();
    });
  }

  photoLister() {
    if (this.photos.length > 0) {
      const length = this.photos.length;
      this.idx = this.photos.indexOf(this.targetPhoto);
      const prevIdx = (this.idx - 1) < 0 ? length - 1 : (this.idx - 1);
      const nextIdx = (this.idx + 1) > length - 1 ? 0 : (this.idx + 1);
      this.prev = this.photos[prevIdx]._id;
      this.next = this.photos[nextIdx]._id;
    }
  }

  ngOnDestroy(): void {
    this.serv.unsubscribe();
  }


  movePhoto(albumId: string, photoId: string) {
    this.move = !this.move;
    this.show = false;
    this.router.navigate([], { queryParams: {} });
    this.store.dispatch(new ChangePhotoAlbum({album: albumId, id: photoId}));

  }

  closeModal() {
    this.show = ! this.show;
    this.router.navigate([], { queryParams: {} });

  }

  del(photo: Photo) {
    this.closeModal();
    this.store.dispatch(new DelPhoto(photo));

  }

  changeAvatar(targetPhoto: Photo) {
    this.store.dispatch(new ChangeAvatar(targetPhoto.url));
  }
}
