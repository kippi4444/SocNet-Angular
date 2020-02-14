import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {Album} from '../../interfaces/album';
import {AlbumService} from '../../services/album.service';
import {Photo} from '../../interfaces/photo';
import {PhotoService} from '../../services/photo.service';


@Component({
  selector: 'app-album-container',
  template: `<app-album  [album] = "userAlbum | async"
                         (deleteAlbum)="deleteAlbum($event)"
                         (uploadPhoto)="uploadPhoto($event)"
                         (deletePhoto)="deletePhoto($event)"
                         (updateAlbum)="updateAlbum($event)"></app-album>`,
  styleUrls: ['./album.component.scss']
})
export class AlbumContainerComponent implements OnInit, OnDestroy {
  album: string;
  routing: Subscription;
  userAlbum: Observable<Album>;
  constructor(private albumService: AlbumService,
              private route: ActivatedRoute,
              private photoService: PhotoService) { }

  ngOnInit() {
    this.routing = this.route.paramMap.subscribe((params: ParamMap) => {
      this.album = params.get('id') ;

      this.getUserAlbum(this.album);
    });
  }

  getUserAlbum(id: string) {
    this.userAlbum = this.albumService.getUserAlbum(id);
  }

  uploadPhoto(file: FormData) {
    const id = this.route.snapshot.paramMap.get('id');
    this.photoService.setAlbumPhoto(id, file ).subscribe(res => { this.userAlbum = this.albumService.getUserAlbum(id);});
  }

  ngOnDestroy(): void {
    this.routing.unsubscribe();
  }

  deletePhoto(photo: Photo) {
    this.photoService.deleteAlbumPhoto(photo);
  }

  updateAlbum(album: object) {
    const id = this.route.snapshot.paramMap.get('id');
    this.albumService.updateAlbum(id, album);
  }

  deleteAlbum(album: Album) {
    this.albumService.deleteAlbum(album._id);
  }
}
