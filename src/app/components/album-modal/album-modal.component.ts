import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Album} from '../../interfaces/album';

@Component({
  selector: 'app-album-modal',
  templateUrl: './album-modal.component.html',
  styleUrls: ['./album-modal.component.scss']
})
export class AlbumModalComponent implements OnInit {
  @Output() uploadAlbum: EventEmitter<Album> = new EventEmitter<Album>();
  @Output() changeStateModal: EventEmitter<void> = new EventEmitter<void>();
  @Input() showModal: boolean;
  @Input() albums: Album[];
  @Input() id: string;

  album: Album = {
    title: '',
    description: '',
    owner: ''
  };

  constructor() { }

  ngOnInit() {
  }

  createAlbum() {
    this.changeStateModal.emit();
    this.album.owner = this.id;
    this.uploadAlbum.emit(this.album);
    this.album = {
      title: '',
      description: '',
      owner: ''
    };
  }


  closeModal() {
    this.changeStateModal.emit();
    this.album = {
      title: ' ',
      description: ' ',
      owner: ' '
    };
  }

}
