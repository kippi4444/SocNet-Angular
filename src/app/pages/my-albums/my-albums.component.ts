import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Album} from '../../interfaces/album';
import {ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-my-albums',
  templateUrl: './my-albums.component.html',
  styleUrls: ['./my-albums.component.scss']
})
export class MyAlbumsComponent {
  @Output() uploadNewAlbum: EventEmitter<Album> = new EventEmitter<Album>();
  @Output() rldComponent: EventEmitter<string> = new EventEmitter<string>();

  @Input() limit: boolean;
  @Input() albums: Album[];
  @Input() link: string;
  @Input() myId: string;
  @Input() isAuth = false;
  @Input() myLogin: string;
  showModal = false;

  sub = [];
  constructor(private route: ActivatedRoute) { }


  uploadAlbum(album: Album) {
    this.uploadNewAlbum.emit(album);
  }

  accountChecker() {
    const login = this.route.snapshot.paramMap.get('id');
    return (this.myLogin === login);
  }

  reloadComponent() {
    this.rldComponent.emit(this.myLogin);
  }
}
