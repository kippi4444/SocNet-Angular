import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Album} from '../../interfaces/album';
import {Router} from '@angular/router';
import {Photo} from '../../interfaces/photo';



@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnDestroy {
  @Output() uploadPhoto: EventEmitter<FormData> = new EventEmitter<FormData>();
  @Output() deletePhoto: EventEmitter<Photo> = new EventEmitter<Photo>();
  @Output() updateAlbum: EventEmitter<Album> = new EventEmitter<Album>();
  @Output() deleteAlbum: EventEmitter<Album> = new EventEmitter<Album>();
  @Output() updPhoto: EventEmitter<void> = new EventEmitter<void>();

  @Input() myId: string;
  @Input() isAuth = false;
  @Input() album: Album | any;
  @Input() photos: Photo[];
  sub = [];
  preview: string | ArrayBuffer;
  editMode = false;
  constructor(private router: Router) { }


  uploadAvatar(photos) {
    this.preview = '';
    this.uploadPhoto.emit(photos);
  }

  delPhoto(idx) {
    const photo  = this.photos.splice(idx , 1);
    this.deletePhoto.emit(photo[0]);
  }

  save() {
    this.editMode = !this.editMode;
    this.updateAlbum.emit(this.album);
  }

  delete() {
    this.deleteAlbum.emit(this.album);
    this.router.navigate(['users/' + this.album.owner.login + '/albums']);
  }



  ngOnDestroy(): void {
      this.sub.forEach(el => {
        el.unsubscribe();
      });
  }

}
