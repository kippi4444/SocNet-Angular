import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Album} from '../../interfaces/album';

@Component({
  selector: 'app-album-modal',
  templateUrl: './album-modal.component.html',
  styleUrls: ['./album-modal.component.scss']
})
export class AlbumModalComponent implements OnInit {
  @Output() uploadAlbum: EventEmitter<object> = new EventEmitter<object>();
  @Input() showModal: boolean;
  @Input() albums: Album[];
  @Input() id:string;
  album: Album = {
    title: '',
    description: '',
    owner: ''
  };

  constructor() { }

  ngOnInit() {
  }

  createAlbum() {
    this.showModal = !this.showModal;
    this.album.owner = this.id;
    this.uploadAlbum.emit(this.album);
    this.album = {
      title: '',
      description: '',
      owner: ''
    };
  }


  closeModal() {
    this.showModal = !this.showModal;
    this.album = {
      title: ' ',
      description: ' ',
      owner: ' '
    };
  }

}
