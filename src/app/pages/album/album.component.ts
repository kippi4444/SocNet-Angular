import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Album} from '../../interfaces/album';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit, OnDestroy {
  @Input() album: Album | any;
  @Output() uploadPhoto: EventEmitter<object> = new EventEmitter<object>();
  @Output() deletePhoto: EventEmitter<object> = new EventEmitter<object>();
  @Output() updateAlbum: EventEmitter<object> = new EventEmitter<object>();
  @Output() deleteAlbum: EventEmitter<object> = new EventEmitter<object>();
  @Output() updPhoto: EventEmitter<void> = new EventEmitter<void>();
  myAccount: string;
  isAuth = false;
  sub = [];
  preview: string | ArrayBuffer;
  editMode = false;
  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.sub.push(this.authService.isAuth.subscribe(state => { this.isAuth = state; }));
    this.sub.push(this.authService.isId.subscribe(id => { this.myAccount = id; }));
  }

  uploadAvatar(photos) {
    this.preview = '';
    this.uploadPhoto.emit(photos);
  }

  delPhoto(idx) {
    const photo  = this.album.photos.splice(idx , 1);
    this.deletePhoto.emit(photo[0]);
  }

  save() {
    this.editMode = !this.editMode;
    this.updateAlbum.emit(this.album);
  }

  delete() {
    this.router.navigate(['friends/' + this.album.owner.login + '/albums']);
    this.deleteAlbum.emit(this.album);
  }

  accountChecker() {
    return (this.myAccount === this.album.owner._id);
  }

  ngOnDestroy(): void {
      this.sub.forEach(el => {
        el.unsubscribe();
      });
  }

  reload() {
    this.updPhoto.emit();
  }
}
