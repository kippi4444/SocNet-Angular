import {Component, OnDestroy, OnInit} from '@angular/core';
import {Album} from '../../interfaces/album';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {AlbumService} from '../../services/album.service';
import {AppState} from '../../store/state/app.state';
import {Store} from '@ngrx/store';
import {stateAuth} from '../../store/selectors/user.selector';
import {AddAlbum, GetAllAlbums} from '../../store/actions/photo.actions';
import {allAlbums, createAlbum, selectedAlbum} from '../../store/selectors/photo.selector';

@Component({
  selector: 'app-my-albums-container',
  template: `<app-my-albums [link]="link"
                     [limit]="limit"
                     [albums]="userAlbums"
                     [myId]="id"
                     [myLogin]="Login"
                     [isAuth]="isAuth$ | async"
                     (rldComponent)="getUsersAlbums($event)"
                     (uploadNewAlbum)="createAlbum($event)"></app-my-albums>`,
  styleUrls: ['./my-albums.component.scss']
})
export class MyAlbumsContainerComponent implements OnInit , OnDestroy {
  id: string = localStorage.getItem('user');
  isAuth$: Observable<boolean> = this.store.select(stateAuth);
  Login: string = localStorage.getItem('login');
  limit: boolean;
  link: string;
  userAlbums: Album[];
  newAlbum$: Observable<string> = this.store.select(createAlbum);
  routing: Subscription;
  sub: Subscription;
  constructor(private route: ActivatedRoute,
              private store: Store<AppState>,
              private router: Router) { }

  ngOnInit() {
    this.routing = this.route.paramMap.subscribe((params: ParamMap) => {
      const loginUser = params.get('id') ;
      if (this.route.routeConfig.path.indexOf('albums') !== -1) {
        this.limit = false;
        this.link = `/users/${loginUser}`;
      } else {
        this.limit = true;
        this.link = `albums`;
      }
      this.getUsersAlbums(loginUser);
    });
  }

  getUsersAlbums(loginUser: string) {
    this.store.dispatch(new GetAllAlbums(loginUser));
    this.sub = this.store.select(allAlbums).subscribe(albums => {
      this.userAlbums = this.limit ? albums.slice(2 , 5) : albums;
    });

  }

  createAlbum(album: Album) {
    this.store.dispatch(new AddAlbum(album));
    this.newAlbum$.subscribe(newAlbum => {this.router.navigate(['album/' + newAlbum]); });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
