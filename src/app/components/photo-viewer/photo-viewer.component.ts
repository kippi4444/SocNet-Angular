import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {PhotoService} from '../../services/photo.service';
import {Subscription} from 'rxjs';
import {AlbumService} from '../../services/album.service';
import {Photo} from '../../interfaces/photo';
import {log} from 'util';

@Component({
  selector: 'app-photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.scss']
})
export class PhotoViewerComponent implements OnInit, OnDestroy {
  photos: Photo[];
  targetPhoto: Photo[];
  photoId: string;
  show: boolean;
  prev: string;
  next: string;
  idx: number;
  serv: Subscription;
  routing: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private photoService: PhotoService,
              private albumService: AlbumService) { }

  ngOnInit() {
    this.route.url.subscribe(next => {
        if (next[0].path === 'users') {
          const login = this.route.snapshot.paramMap.get('id');
          this.serv = this.photoService.getAllPhotos(login).subscribe(
            photos => {
              this.photos = photos;
              this.routingStart();
            }
          );
        }

        if (next[0].path === 'album')  {
          const id = this.route.snapshot.paramMap.get('id');
          this.serv = this.albumService.getUserAlbum(id).subscribe(
            album => {
              this.photos = album.photos as Photo[];
              this.routingStart();
            }
          );
        }
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


}
