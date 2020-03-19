import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../state/app.state';
import {
  AddAlbum, AddAlbumFailure,
  AddAlbumSuccess, AddComment, AddCommentSuccess,
  AddPhoto, AddPhotoFailure,
  AddPhotoSuccess,
  AddPhotoWall, AddPhotoWallFailure,
  AddPhotoWallSuccess,
  ChangePhotoAlbum, ChangePhotoAlbumFailure, ChangePhotoAlbumSuccess,
  DelAlbum, DelAlbumFailure, DelAlbumSuccess,
  DelPhoto, DelPhotoFailure,
  DelPhotoSuccess,
  GetAllAlbums, GetAllAlbumsFailure,
  GetAllAlbumsSuccess,
  GetAllPhotos, GetAllPhotosFailure,
  GetAllPhotosSuccess,
  GetSelectedAlbum, GetSelectedAlbumFailure,
  GetSelectedAlbumSuccess, LikeDislikePhoto, LikeDislikePhotoFailure,
  UpdAlbum, UpdAlbumFailure,
  UpdAlbumSuccess,
  UserPhotosActions,
  AddCommentFailure, DelComment, DelCommentSuccess, DelCommentFailure
} from '../actions/photo.actions';
import {AlbumService} from '../../services/album.service';
import {PhotoService} from '../../services/photo.service';
import {Album} from '../../interfaces/album';
import {Photo} from '../../interfaces/photo';
import {WebsocketService} from '../../services/websocket.service';
import {CommentService} from '../../services/comment.service';
import {Comments} from '../../interfaces/comments';
import {GetError} from '../actions/errors.actions';




@Injectable()
export class UserPhotos {

  @Effect()
  getAllAlbums$ = this.actions$.pipe(
    ofType<GetAllAlbums>(UserPhotosActions.GET_ALL_USER_ALBUMS),
    switchMap((action: GetAllAlbums ) => this.albumService.getUserAlbums(action.payload)
      .pipe(
        map((albums: Album[]) => new GetAllAlbumsSuccess(albums)),
        catchError((err) => [new GetAllAlbumsFailure(err), new GetError(err)])
      )
    )
  );

  @Effect()
  getSelectedAlbum$ = this.actions$.pipe(
    ofType<GetSelectedAlbum>(UserPhotosActions.GET_SELECTED_ALBUM),
    switchMap((action: GetSelectedAlbum) => this.albumService.getUserAlbum(action.payload)
      .pipe(
        map(( req ) =>  new GetSelectedAlbumSuccess(req)),
        catchError((err) => [new GetSelectedAlbumFailure(err), new GetError(err)])
      )
    ),
  );

  @Effect()
  getAllPhotos$ = this.actions$.pipe(
    ofType<GetAllPhotos>(UserPhotosActions.GET_ALL_PHOTOS),
    switchMap((action: GetAllPhotos) => this.photoService.getAllPhotos(action.payload)
      .pipe(
        map((photos: Photo[]) => new GetAllPhotosSuccess(photos)),
        catchError((err) => [new GetAllPhotosFailure(err), new GetError(err)])
      )
    )
  );


  @Effect()
  addAlbum$ = this.actions$.pipe(
    ofType<AddAlbum>(UserPhotosActions.ADD_ALBUM),
    switchMap((action: AddAlbum) => this.albumService.createAlbum(action.payload)
      .pipe(
        map((album: Album) => new AddAlbumSuccess(album)),
        catchError((err) => [new AddAlbumFailure(err), new GetError(err)])
      )
    )
  );

  @Effect()
  delAlbum$ = this.actions$.pipe(
    ofType<DelAlbum>(UserPhotosActions.DEL_ALBUM),
    switchMap((action: DelAlbum) => this.albumService.deleteAlbum(action.payload)
      .pipe(
        map((album: string) => new DelAlbumSuccess(album)),
        catchError((err) => [new DelAlbumFailure(err), new GetError(err)])
      )
    )
  );

  @Effect()
  updatedAlbum$ = this.actions$.pipe(
    ofType<UpdAlbum>(UserPhotosActions.UPDATED_ALBUM),
    switchMap((action: UpdAlbum) => this.albumService.updateAlbum(action.payload)
      .pipe(
        map((album: Album) => new UpdAlbumSuccess(album)),
        catchError((err) => [new UpdAlbumFailure(err), new GetError(err)])
      )
    )
  );

  @Effect()
  addPhoto$ = this.actions$.pipe(
    ofType<AddPhoto>(UserPhotosActions.ADD_PHOTO_ALBUM),
    switchMap((action: AddPhoto) => this.photoService.setAlbumPhoto(action.payload)
      .pipe(
        map((photo: Photo[]) => new AddPhotoSuccess(photo)),
        catchError((err) => [new AddPhotoFailure(err), new GetError(err)])
      )
    )
  );

  @Effect()
  addPhotoWall$ = this.actions$.pipe(
    ofType<AddPhotoWall>(UserPhotosActions.ADD_PHOTO_WALL),
    switchMap((action: AddPhotoWall) => this.photoService.setWallPhoto(action.payload)
      .pipe(
        map((photo: Photo[]) => new AddPhotoWallSuccess(photo)),
        catchError((err) => [new AddPhotoWallFailure(err), new GetError(err)])
      )
    )
  );

  @Effect()
  delPhoto$ = this.actions$.pipe(
    ofType<DelPhoto>(UserPhotosActions.DEL_PHOTO),
    switchMap((action: DelPhoto) => this.photoService.deleteAlbumPhoto(action.payload)
      .pipe(
        map((photo: string) => new DelPhotoSuccess(photo)),
        catchError((err) => [new DelPhotoFailure(err), new GetError(err)])
      )
    )
  );

  @Effect()
  changeAlbumPhoto$ = this.actions$.pipe(
    ofType<ChangePhotoAlbum>(UserPhotosActions.CHANGE_PHOTO_ALBUM),
    switchMap((action: ChangePhotoAlbum) => this.photoService.movePhoto(action.payload)
      .pipe(
        map((photo: Photo[]) => new ChangePhotoAlbumSuccess(photo[0])),
        catchError((err) => [new ChangePhotoAlbumFailure(err), new GetError(err)])
      )
    )
  );

  @Effect({dispatch: false})
  setLikeDislikePhoto$ = this.actions$.pipe(
    ofType<LikeDislikePhoto>(UserPhotosActions.LIKE_DISLIKE),
    map((action: LikeDislikePhoto ) => this.websocketService.setLikeDislike(action.payload)),
    catchError(err => [new LikeDislikePhotoFailure(err), new GetError(err)])
  );

  @Effect()
  setAddComment$ = this.actions$.pipe(
    ofType<AddComment>(UserPhotosActions.ADD_COMMENT),
    switchMap((action: AddComment ) => this.commentService.addComment(action.payload)
      .pipe(
        map((comment: Comments) => new AddCommentSuccess(comment)),
        catchError(err => [new AddCommentFailure(err), new GetError(err)])
      )
    )
  );

  @Effect()
  deleteComment$ = this.actions$.pipe(
    ofType<DelComment>(UserPhotosActions.DEL_COMMENT),
    switchMap((action: DelComment ) => this.commentService.delComment(action.payload)
      .pipe(
        map((comment: Comments) => new DelCommentSuccess(comment)),
        catchError(err => [new DelCommentFailure(), new GetError(err)])
      )
    )
  );

  constructor(private actions$: Actions,
              private albumService: AlbumService,
              private photoService: PhotoService,
              private websocketService: WebsocketService,
              private commentService: CommentService,
              private store: Store<AppState>) {}
}
