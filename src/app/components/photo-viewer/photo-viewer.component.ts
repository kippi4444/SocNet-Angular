import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute,  Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {Photo} from '../../interfaces/photo';
import {Album} from '../../interfaces/album';
import {AppState} from '../../store/state/app.state';
import {Store} from '@ngrx/store';
import {allAlbums, allPhotos,  selectedAlbumPhoto} from '../../store/selectors/photo.selector';
import {AddComment, ChangePhotoAlbum, DelComment, DelPhoto, LikeDislikePhoto} from '../../store/actions/photo.actions';
import {ChangeAvatar} from '../../store/actions/user.actions';
import {transition, trigger, useAnimation} from '@angular/animations';
import {enterAnimation, outAnimation} from '../../animations/fadeOut';
import {authentificatedUser} from '../../store/selectors/user.selector';


@Component({
  selector: 'app-photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.scss'],
  animations: [
    trigger('viewerAnim', [
      transition(':enter', [
        useAnimation(enterAnimation)
      ]),
      transition(':leave', [
        useAnimation(outAnimation)
      ]),
    ])]
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
  idSub: Subscription;
  edit = false;
  text: string;

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

  addLike(photo) {
    this.store.select(authentificatedUser).subscribe(value => {
        this.store.dispatch(new LikeDislikePhoto({photo, like: value}));
    });

  }

  sendComment(photo: Photo) {
    if (this.text) {
      this.idSub = this.myId.subscribe(id => {
        const comment = {
          text: this.text,
          user: id,
          photo: photo._id,
          };
        this.store.dispatch(new AddComment(comment));
        this.text = '';
      });
    }
  }

  ngOnDestroy(): void {
    this.serv.unsubscribe();
    // this.idSub.unsubscribe();
  }

  deleteComment(id: string) {
    this.store.dispatch(new DelComment(id));
  }
}
