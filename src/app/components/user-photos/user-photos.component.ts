import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Photo} from '../../interfaces/photo';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-photos',
  templateUrl: './user-photos.component.html',
  styleUrls: ['./user-photos.component.scss']
})
export class UserPhotosComponent implements OnInit, OnDestroy {
  @Output() deletePhoto: EventEmitter<Photo> = new EventEmitter<Photo>();
  @Output() upldPhoto: EventEmitter<FormData> = new EventEmitter<FormData>();
  @Output() updComponent: EventEmitter<object> = new EventEmitter<object>();
  @Input() photos: Photo[];
  @Input() limit: boolean;
  @Input() link: string;
  @Input() isAuth: boolean;
  @Input() myId: string;
  sub = [];
  showModal = false;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

  delPhoto(idx) {
    const photo  = this.photos.splice(idx , 1);
    this.deletePhoto.emit(photo[0]);
  }


  ngOnDestroy(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }


  uploadPhoto(photo: FormData) {
    this.upldPhoto.emit(photo);
  }

  reload() {
    this.updComponent.emit();
  }
}
