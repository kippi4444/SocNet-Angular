import { Action } from '@ngrx/store';
import {Album} from '../../interfaces/album';
import {Photo} from '../../interfaces/photo';
import {Msg} from '../../interfaces/msg';
import {User} from '../../interfaces/user';
import {Comments} from '../../interfaces/comments';


export const UserPhotosActions = {
  GET_ALL_USER_ALBUMS: '[Album] Get All User Albums',
  GET_ALL_USER_ALBUMS_SUCCESS: '[Album] Get All User Albums Success',
  GET_ALL_USER_ALBUMS_FAILURE: '[Album] Get All User Albums Failure',
  GET_SELECTED_ALBUM: '[Album] Get Selected Album',
  GET_SELECTED_ALBUM_SUCCESS: '[Album] Get Selected Album Success',
  GET_SELECTED_ALBUM_FAILURE: '[Album] Get Selected Album Failure',
  DEL_ALBUM: '[Album] Del Album',
  DEL_ALBUM_SUCCESS: '[Album] Del Album Success',
  DEL_ALBUM_FAILURE: '[Album] Del Album Failure',
  ADD_ALBUM: '[Album] Add Album',
  ADD_ALBUM_SUCCESS: '[Album] Add Album Success',
  ADD_ALBUM_FAILURE: '[Album] Add Album Failure',
  UPDATED_ALBUM: '[Album] Updated Album',
  UPDATED_ALBUM_SUCCESS: '[Album] Updated Album Success',
  UPDATED_ALBUM_FAILURE: '[Album] Updated Album Failure',
  GET_ALL_PHOTOS: '[Photo] Get All Photos',
  GET_ALL_PHOTOS_SUCCESS: '[Photo] Get All Photos Success',
  GET_ALL_PHOTOS_FAILURE: '[Photo] Get All Photos Failure',
  GET_SELECTED_PHOTO: '[Photo] Get Selected Photo',
  GET_SELECTED_PHOTO_SUCCESS: '[Photo] Get Selected Photo Success',
  GET_SELECTED_PHOTO_FAILURE: '[Photo] Get Selected Photo Failure',
  ADD_PHOTO_ALBUM: '[Photo] Add Photo In Album',
  ADD_PHOTO_ALBUM_SUCCESS: '[Photo] Add Photo In Album Success',
  ADD_PHOTO_ALBUM_FAILURE: '[Photo] Add Photo In Album Failure',
  ADD_PHOTO_WALL: '[Photo] Add Photo In Wall',
  ADD_PHOTO_WALL_SUCCESS: '[Photo] Add Photo In Wall Success',
  ADD_PHOTO_WALL_FAILURE: '[Photo] Add Photo In Wall Failure',
  DEL_PHOTO: '[Photo] Del Photo',
  DEL_PHOTO_SUCCESS: '[Photo] Del Photo Success',
  DEL_PHOTO_FAILURE: '[Photo] Del Photo Failure',
  CHANGE_PHOTO_ALBUM: '[Photo] CHANGE_PHOTO_ALBUM',
  CHANGE_PHOTO_ALBUM_SUCCESS: '[Photo] CHANGE_PHOTO_ALBUM Success',
  CHANGE_PHOTO_ALBUM_FAILURE: '[Photo] CHANGE_PHOTO_ALBUM Failure',
  LIKE_DISLIKE: '[LIKE_DISLIKE] LIKE/DISLIKE Photo',
  LIKE_DISLIKE_SUCCESS: '[LIKE_DISLIKE] LIKE/DISLIKE Photo Success',
  LIKE_DISLIKE_FAILURE: '[LIKE_DISLIKE] LIKE/DISLIKE Photo Failure',
  LIKE_EVENT: '[LIKE_EVENT] LIKE/DISLIKE event',
  LIKE_EVENT_SUCCESS: '[LIKE_EVENT] LIKE/DISLIKE event Success',
  LIKE_EVENT_FAILURE: '[LIKE_EVENT] LIKE/DISLIKE event Failure',
  ADD_COMMENT: '[ADD_COMMENT] Add Comment',
  ADD_COMMENT_SUCCESS: '[ADD_COMMENT] Add Comment Success',
  ADD_COMMENT_FAILURE: '[ADD_COMMENT] Add Comment Failure',
  DEL_COMMENT: '[DEL_COMMENT] Del Comment',
  DEL_COMMENT_SUCCESS: '[DEL_COMMENT] Del Comment Success',
  DEL_COMMENT_FAILURE: '[DEL_COMMENT] Del Comment Failure',
};

// ==============================  all albums ================================ //

export  class GetAllAlbums implements  Action {
  public readonly type = UserPhotosActions.GET_ALL_USER_ALBUMS;
  constructor(public payload: string) {}
}

export  class GetAllAlbumsSuccess implements  Action {
  public readonly type = UserPhotosActions.GET_ALL_USER_ALBUMS_SUCCESS;
  constructor(public payload: Album[]) {}
}

export  class GetAllAlbumsFailure implements  Action {
  public readonly type = UserPhotosActions.GET_ALL_USER_ALBUMS_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  selected album ================================ //

export  class GetSelectedAlbum implements  Action {
  public readonly type = UserPhotosActions.GET_SELECTED_ALBUM;
  constructor(public payload: string) {}
}

export  class GetSelectedAlbumSuccess implements  Action {
  public readonly type = UserPhotosActions.GET_SELECTED_ALBUM_SUCCESS;
  constructor(public payload: object) {}
}

export  class GetSelectedAlbumFailure implements  Action {
  public readonly type = UserPhotosActions.GET_SELECTED_ALBUM_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  add album ================================ //

export  class AddAlbum implements  Action {
  public readonly type = UserPhotosActions.ADD_ALBUM;

  constructor(public payload: Album | { album: Album, photos: Photo[]}) {
  }
}

export  class AddAlbumSuccess implements  Action {
  public readonly type = UserPhotosActions.ADD_ALBUM_SUCCESS;
  constructor(public payload: Album) {}
}

export  class AddAlbumFailure implements  Action {
  public readonly type = UserPhotosActions.ADD_ALBUM_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  del album ================================ //

export  class DelAlbum implements  Action {
  public readonly type = UserPhotosActions.DEL_ALBUM;
  constructor(public payload: string) {}
}

export  class DelAlbumSuccess implements  Action {
  public readonly type = UserPhotosActions.DEL_ALBUM_SUCCESS;
  constructor(public payload: string) {}
}

export  class DelAlbumFailure implements  Action {
  public readonly type = UserPhotosActions.DEL_ALBUM_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  UPDATE album ================================ //

export  class UpdAlbum implements  Action {
  public readonly type = UserPhotosActions.UPDATED_ALBUM;
  constructor(public payload: {id: string , album: object}) {}
}

export  class UpdAlbumSuccess implements  Action {
  public readonly type = UserPhotosActions.UPDATED_ALBUM_SUCCESS;
  constructor(public payload: Album) {}
}

export  class UpdAlbumFailure implements  Action {
  public readonly type = UserPhotosActions.UPDATED_ALBUM_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  all photos ================================ //

export  class GetAllPhotos implements  Action {
  public readonly type = UserPhotosActions.GET_ALL_PHOTOS;
  constructor(public payload: string) {}
}

export  class GetAllPhotosSuccess implements  Action {
  public readonly type = UserPhotosActions.GET_ALL_PHOTOS_SUCCESS;
  constructor(public payload: Photo[]) {}
}

export  class GetAllPhotosFailure implements  Action {
  public readonly type = UserPhotosActions.GET_ALL_PHOTOS_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  selected photo ================================ //

export  class GetSelectedPhoto implements  Action {
  public readonly type = UserPhotosActions.GET_SELECTED_PHOTO;
  constructor(public payload: string) {}
}

export  class GetSelectedPhotoSuccess implements  Action {
  public readonly type = UserPhotosActions.GET_SELECTED_PHOTO_SUCCESS;
  constructor(public payload: Photo[]) {}
}

export  class GetSelectedPhotoFailure implements  Action {
  public readonly type = UserPhotosActions.GET_SELECTED_PHOTO_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  add photo album ================================ //

export  class AddPhoto implements  Action {
  public readonly type = UserPhotosActions.ADD_PHOTO_ALBUM;
  constructor(public payload: {id: string, file: FormData}) {}
}

export  class AddPhotoSuccess implements  Action {
  public readonly type = UserPhotosActions.ADD_PHOTO_ALBUM_SUCCESS;
  constructor(public payload: Photo[]) {}
}

export  class AddPhotoFailure implements  Action {
  public readonly type = UserPhotosActions.ADD_PHOTO_ALBUM_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  add photo in wall ================================ //

export  class AddPhotoWall implements  Action {
  public readonly type = UserPhotosActions.ADD_PHOTO_WALL;
  constructor(public payload: FormData) {}
}

export  class AddPhotoWallSuccess implements  Action {
  public readonly type = UserPhotosActions.ADD_PHOTO_WALL_SUCCESS;
  constructor(public payload: Photo[]) {}
}

export  class AddPhotoWallFailure implements  Action {
  public readonly type = UserPhotosActions.ADD_PHOTO_WALL_FAILURE;
  constructor(public payload?: any) {
  }
}


// ==============================  CHANGE PHOTO ALBUM ================================ //

export  class ChangePhotoAlbum implements  Action {
  public readonly type = UserPhotosActions.CHANGE_PHOTO_ALBUM;
  constructor(public payload: {id: string, album: string}) {}
}

export  class ChangePhotoAlbumSuccess implements  Action {
  public readonly type = UserPhotosActions.CHANGE_PHOTO_ALBUM_SUCCESS;
  constructor(public payload: Photo) {}
}

export  class ChangePhotoAlbumFailure implements  Action {
  public readonly type = UserPhotosActions.CHANGE_PHOTO_ALBUM_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  del album photo ================================ //

export  class DelPhoto implements  Action {
  public readonly type = UserPhotosActions.DEL_PHOTO;
  constructor(public payload: Photo) {}
}

export  class DelPhotoSuccess implements  Action {
  public readonly type = UserPhotosActions.DEL_PHOTO_SUCCESS;
  constructor(public payload: string) {}
}

export  class DelPhotoFailure implements  Action {
  public readonly type = UserPhotosActions.DEL_PHOTO_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  LIKE / DISLIKE ================================ //

export  class LikeDislikePhoto implements  Action {
  public readonly type = UserPhotosActions.LIKE_DISLIKE;
  constructor(public payload: { photo: Photo; like: User } ) {}
}

export  class LikeDislikePhotoSuccess implements  Action {
  public readonly type = UserPhotosActions.LIKE_DISLIKE_SUCCESS;
  constructor(public payload: {event: string, mes: Msg, like?: User }) {}
}

export  class LikeDislikePhotoFailure implements  Action {
  public readonly type = UserPhotosActions.LIKE_DISLIKE_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  LIKE / DISLIKE event================================ //

export  class LikeDislikeEvent implements  Action {
  public readonly type = UserPhotosActions.LIKE_EVENT;
  constructor(public payload?: object) {}
}

export  class LikeDislikeEventSuccess implements  Action {
  public readonly type = UserPhotosActions.LIKE_EVENT_SUCCESS;
  constructor(public payload?: { event: string; mes: Msg }) {}
}

export  class LikeDislikeEventFailure implements  Action {
  public readonly type = UserPhotosActions.LIKE_EVENT_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  add Comment ================================ //

export  class AddComment implements  Action {
  public readonly type = UserPhotosActions.ADD_COMMENT;
  constructor(public payload: Comments) {}
}

export  class AddCommentSuccess implements  Action {
  public readonly type = UserPhotosActions.ADD_COMMENT_SUCCESS;
  constructor(public payload: Comments) {}
}

export  class AddCommentFailure implements  Action {
  public readonly type = UserPhotosActions.ADD_COMMENT_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  del Comment ================================ //

export  class DelComment implements  Action {
  public readonly type = UserPhotosActions.DEL_COMMENT;
  constructor(public payload: string) {}
}

export  class DelCommentSuccess implements  Action {
  public readonly type = UserPhotosActions.DEL_COMMENT_SUCCESS;
  constructor(public payload: Comments) {}
}

export  class DelCommentFailure implements  Action {
  public readonly type = UserPhotosActions.DEL_COMMENT_FAILURE;
  constructor(public payload?: any) {
  }
}

export type UserPhotosActions = GetAllAlbums |
  GetAllAlbumsSuccess |
  GetAllAlbumsFailure |
  GetSelectedAlbum |
  GetSelectedAlbumSuccess |
  GetSelectedAlbumFailure |
  DelAlbum |
  DelAlbumSuccess |
  DelAlbumFailure |
  UpdAlbum |
  UpdAlbumSuccess |
  UpdAlbumFailure |
  GetAllPhotos |
  GetAllPhotosSuccess |
  GetAllPhotosFailure |
  GetSelectedPhoto |
  GetSelectedPhotoSuccess |
  GetSelectedPhotoFailure |
  AddPhoto |
  AddPhotoSuccess |
  AddPhotoFailure |
  DelPhoto |
  DelPhotoSuccess |
  DelPhotoFailure |
  AddAlbum |
  AddAlbumSuccess |
  AddAlbumFailure |
  AddPhotoWall |
  AddPhotoWallSuccess |
  AddPhotoWallFailure |
  ChangePhotoAlbum |
  ChangePhotoAlbumSuccess |
  ChangePhotoAlbumFailure |
  LikeDislikePhoto |
  LikeDislikePhotoSuccess |
  LikeDislikePhotoFailure |
  LikeDislikeEvent |
  LikeDislikeEventSuccess |
  LikeDislikeEventFailure |
  AddComment |
  AddCommentSuccess |
  AddCommentFailure |
  DelComment |
  DelCommentSuccess |
  DelCommentFailure;
