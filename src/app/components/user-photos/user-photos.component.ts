import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Photo} from '../../interfaces/photo';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-photos',
  templateUrl: './user-photos.component.html',
  styleUrls: ['./user-photos.component.scss']
})
export class UserPhotosComponent implements OnInit, OnDestroy {
  @Output() deletePhoto: EventEmitter<object> = new EventEmitter<object>();
  @Output() upldPhoto: EventEmitter<object> = new EventEmitter<object>();
  @Output() updComponent: EventEmitter<object> = new EventEmitter<object>();
  @Input() photos: Photo[];
  @Input() limit: boolean;
  @Input() link: string;
  isAuth = false;
  myAccount: string;
  sub = [];
  showModal = false;
  constructor(private authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.authService.isAuth.subscribe(state => { this.isAuth = state});
    this.authService.isLogin.subscribe(login => { this.myAccount = login});
  }

  delPhoto(idx) {
    const photo  = this.photos.splice(idx , 1);
    this.deletePhoto.emit(photo[0]);
  }

  accountChecker() {
    const login = this.route.snapshot.paramMap.get('id');
    return (this.myAccount === login);
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
