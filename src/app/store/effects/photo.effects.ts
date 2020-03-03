import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../state/app.state';
import {of} from 'rxjs';
import {
  AddAlbum,
  AddAlbumSuccess,
  AddPhoto,
  AddPhotoSuccess,
  AddPhotoWall,
  AddPhotoWallSuccess,
  ChangePhotoAlbum, ChangePhotoAlbumSuccess,
  DelAlbum, DelAlbumSuccess,
  DelPhoto,
  DelPhotoSuccess,
  GetAllAlbums,
  GetAllAlbumsSuccess,
  GetAllPhotos,
  GetAllPhotosSuccess,
  GetSelectedAlbum,
  GetSelectedAlbumSuccess,
  UpdAlbum,
  UpdAlbumSuccess,
  UserPhotosActions
} from '../actions/photo.actions';
import {AlbumService} from '../../services/album.service';
import {PhotoService} from '../../services/photo.service';
import {Album} from '../../interfaces/album';
import {Photo} from '../../interfaces/photo';




@Injectable()
export class UserPhotos {

  @Effect()
  getAllAlbums$ = this.actions$.pipe(
    ofType<GetAllAlbums>(UserPhotosActions.GET_ALL_USER_ALBUMS),
    switchMap((action: GetAllAlbums ) => this.albumService.getUserAlbums(action.payload)),
    switchMap((albums: Album[]) => of(new GetAllAlbumsSuccess(albums)))
  );

  @Effect()
  getSelectedAlbum$ = this.actions$.pipe(
    ofType<GetSelectedAlbum>(UserPhotosActions.GET_SELECTED_ALBUM),
    switchMap((action: GetSelectedAlbum) => this.albumService.getUserAlbum(action.payload)),
    switchMap((album: Album) => of(new GetSelectedAlbumSuccess(album)))
  );

  @Effect()
  getAllPhotos$ = this.actions$.pipe(
    ofType<GetAllPhotos>(UserPhotosActions.GET_ALL_PHOTOS),
    switchMap((action: GetAllPhotos) => this.photoService.getAllPhotos(action.payload)),
    switchMap((photos: Photo[]) => of(new GetAllPhotosSuccess(photos)))
  );

  // @Effect()
  // getSelectedPhoto$ = this.actions$.pipe(
  //   ofType<GetSelectedPhoto>(UserPhotosActions.GET_SELECTED_PHOTO),
  //   // switchMap((action: GetSelectedPhoto) => this.store.select(allPhotos)),
  //   // switchMap((photos: Photo[]) => {
  //   //   const photo = photos.filter(pht => pht._id === action.payload);
  //   //   return of(new GetSelectedPhotoSuccess(photo));
  //   // })
  // );

  @Effect()
  addAlbum$ = this.actions$.pipe(
    ofType<AddAlbum>(UserPhotosActions.ADD_ALBUM),
    switchMap((action: AddAlbum) => this.albumService.createAlbum(action.payload)),
    switchMap((album: Album) => {
      return of(new AddAlbumSuccess(album))})
  );

  @Effect()
  delAlbum$ = this.actions$.pipe(
    ofType<DelAlbum>(UserPhotosActions.DEL_ALBUM),
    switchMap((action: DelAlbum) => this.albumService.deleteAlbum(action.payload)),
    switchMap((album: string) => of(new DelAlbumSuccess(album)))
  );

  @Effect()
  updatedAlbum$ = this.actions$.pipe(
    ofType<UpdAlbum>(UserPhotosActions.UPDATED_ALBUM),
    switchMap((action: UpdAlbum) => this.albumService.updateAlbum(action.payload)),
    switchMap((album: Album) => of(new UpdAlbumSuccess(album)))
  );

  @Effect()
  addPhoto$ = this.actions$.pipe(
    ofType<AddPhoto>(UserPhotosActions.ADD_PHOTO_ALBUM),
    switchMap((action: AddPhoto) => this.photoService.setAlbumPhoto(action.payload)),
    switchMap((photo: Photo[]) => of(new AddPhotoSuccess(photo)))
  );

  @Effect()
  addPhotoWall$ = this.actions$.pipe(
    ofType<AddPhotoWall>(UserPhotosActions.ADD_PHOTO_WALL),
    switchMap((action: AddPhotoWall) => this.photoService.setWallPhoto(action.payload)),
    switchMap((photo: Photo[]) => of(new AddPhotoWallSuccess(photo)))
  );

  @Effect()
  delPhoto$ = this.actions$.pipe(
    ofType<DelPhoto>(UserPhotosActions.DEL_PHOTO),
    switchMap((action: DelPhoto) => this.photoService.deleteAlbumPhoto(action.payload)),
    switchMap((photo: string) => of(new DelPhotoSuccess(photo)))
  );



  @Effect()
  changeAlbumPhoto$ = this.actions$.pipe(
    ofType<ChangePhotoAlbum>(UserPhotosActions.CHANGE_PHOTO_ALBUM),
    switchMap((action: ChangePhotoAlbum) => this.photoService.movePhoto(action.payload)),
    switchMap((photo: Photo) => of(new ChangePhotoAlbumSuccess(photo))),
  );

  constructor(private actions$: Actions,
              private albumService: AlbumService,
              private photoService: PhotoService,
              private store: Store<AppState>) {}
}
