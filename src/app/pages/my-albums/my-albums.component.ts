import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Album} from '../../interfaces/album';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-my-albums',
  templateUrl: './my-albums.component.html',
  styleUrls: ['./my-albums.component.scss']
})
export class MyAlbumsComponent implements OnInit, OnDestroy {
  @Output() uploadNewAlbum: EventEmitter<object> = new EventEmitter<object>();
  @Input() limit: boolean;
  @Input() albums: Album[];
  @Input() link: string;
  showModal = false;
  myAccount: string;
  isAuth = false;
  myLogin: string;
  sub = [];
  constructor(private authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub.push(this.authService.isAuth.subscribe(state => { this.isAuth = state}));
    this.sub.push(this.authService.isId.subscribe(id => { this.myAccount = id }));
    this.sub.push(this.authService.isLogin.subscribe(login => { this.myLogin = login }));
  }

  uploadAlbum(album: Album) {
    this.uploadNewAlbum.emit(album);
  }

  accountChecker() {
    const login = this.route.snapshot.paramMap.get('id');
    return (this.myLogin === login);
  }


  ngOnDestroy(): void {
    this.sub.forEach(el => {
      el.unsubscribe();
    })
  }
}
