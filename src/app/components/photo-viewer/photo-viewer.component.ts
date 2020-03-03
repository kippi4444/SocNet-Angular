import {Component, EventEmitter,  OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute,  Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {PhotoService} from '../../services/photo.service';
import {Observable, Subscription} from 'rxjs';
import {Photo} from '../../interfaces/photo';
import {Album} from '../../interfaces/album';
import {AlbumService} from '../../services/album.service';
import {AppState} from '../../store/state/app.state';
import {Store} from '@ngrx/store';
import {allAlbums, allPhotos, selectedAlbum, selectedAlbumPhoto} from '../../store/selectors/photo.selector';
import {ChangePhotoAlbum, GetAllPhotos} from '../../store/actions/photo.actions';

@Component({
  selector: 'app-photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.scss']
})
export class PhotoViewerComponent implements OnInit, OnDestroy {
  @Output() reload: EventEmitter<void> = new EventEmitter<void>();

  photos: Photo[];
  targetPhoto: Photo[];
  photoId: string;
  show: boolean;
  prev: string;
  next: string;
  idx: number;
  move = false;
  userAlbums$: Observable<Album[]>;
  serv: Subscription;
  routing: Subscription;

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
    const login = this.route.snapshot.paramMap.get('id');
    this.serv = this.store.select(allPhotos).subscribe(photos => {
      this.photos = photos;
      this.routingStart();
    });
  }

  getUserAlbum() {
    const id = this.route.snapshot.paramMap.get('id');
    this.serv = this.store.select(selectedAlbumPhoto).subscribe(album => {
      this.photos = album;
      this.routingStart();
    });
  }

  routingStart() {
   this.routing = this.route.queryParams.pipe(filter(params => params.photo)).subscribe(params => {
      this.photoId = params.photo;
      this.targetPhoto = this.photos.filter(photo => photo._id === this.photoId);
      this.show = true;
      this.photoLister();
    });
  }

  photoLister() {
    const length = this.photos.length;
    this.idx = this.photos.indexOf(this.targetPhoto[0]);
    const prevIdx = (this.idx - 1) < 0 ? length - 1 : (this.idx - 1);
    const nextIdx = (this.idx + 1) > length - 1 ? 0 : (this.idx + 1);
    this.prev = this.photos[prevIdx]._id;
    this.next = this.photos[nextIdx]._id;
  }

  ngOnDestroy(): void {
    this.serv.unsubscribe();
  }


  movePhoto(albumId: string, photoId: string) {
    const id = this.route.snapshot.paramMap.get('id');
    this.move = !this.move;
    this.show = false;
    this.store.dispatch(new ChangePhotoAlbum({album: albumId, id: photoId}));
  }
}
