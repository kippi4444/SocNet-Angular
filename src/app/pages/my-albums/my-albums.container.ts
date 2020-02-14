import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../interfaces/user';
import {Album} from '../../interfaces/album';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {AlbumService} from '../../services/album.service';

@Component({
  selector: 'app-my-albums-container',
  template: '<app-my-albums [link]="link" [limit]="limit" [albums] = "userAlbums" (uploadNewAlbum) = "createAlbum($event)"></app-my-albums>',
  styleUrls: ['./my-albums.component.scss']
})
export class MyAlbumsContainerComponent implements OnInit , OnDestroy {
  limit: boolean;
  link: string;
  userAlbums: Album[];
  newAlbum$: Observable<Album>;
  routing: Subscription;
  sub: Subscription;
  constructor(private albumService: AlbumService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.routing = this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id') ;
      if (this.route.routeConfig.path.indexOf('albums') !== -1) {
        this.limit = false;
        this.link = `/users/${id}`;
      } else {
        this.limit = true;
        this.link = `albums`;
      }
      this.sub = this.albumService.getUserAlbums(id).subscribe(
        allAlbums => {
          this.userAlbums = this.limit ? allAlbums.splice(1 , 3) : allAlbums
        });
    });


  }

  createAlbum(album: Album) {
    this.newAlbum$ = this.albumService.createAlbum(album);
    this.newAlbum$.subscribe(id => {this.router.navigate(['album/' + id])});
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
