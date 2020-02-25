import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Photo} from '../../interfaces/photo';
import {ActivatedRoute} from '@angular/router';
import {PhotoService} from '../../services/photo.service';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-user-photos-container',
  template: `<app-user-photos [link] = "link"
                              [limit] = "limit"
                              [photos] = "userPhotos"
                              (upldPhoto)="uploadPhoto($event)"
                              (deletePhoto)="deletePhoto($event)"></app-user-photos>`,
  styleUrls: ['./user-photos.component.scss']
})
export class UserPhotosContainerComponent implements OnInit, OnDestroy {
  @Output() reloadComponent: EventEmitter<void> = new EventEmitter<void>();
  @Input() limit: boolean;
  @Input() link: string;
  sub: Subscription;
  photos: any;
  userPhotos: Photo[];
  constructor(private route: ActivatedRoute,
              private photoService: PhotoService) { }

  ngOnInit() {
    this.getUserPhotos();
  }

  getUserPhotos(){
    const id = this.route.snapshot.paramMap.get('id');
    this.sub = this.photoService.getAllPhotos(id).subscribe(
      photos => {
        this.userPhotos = this.limit ? photos.splice(0 , 4) : photos;
      });
  }

  deletePhoto(photo: Photo) {
    this.photoService.deleteAlbumPhoto(photo);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  uploadPhoto(photo: FormData) {
    this.photoService.setWallPhoto(photo).subscribe(value => {
      this.reloadComponent.emit();
      this.getUserPhotos();
    });
  }

}
