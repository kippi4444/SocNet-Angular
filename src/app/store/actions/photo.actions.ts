import { Action } from '@ngrx/store';
import {Album} from '../../interfaces/album';
import {Photo} from '../../interfaces/photo';


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
  constructor(public payload: Album) {}
}

export  class GetSelectedAlbumFailure implements  Action {
  public readonly type = UserPhotosActions.GET_SELECTED_ALBUM_FAILURE;
  constructor(public payload?: any) {
  }
}

// ==============================  add album ================================ //

export  class AddAlbum implements  Action {
  public readonly type = UserPhotosActions.ADD_ALBUM;
  constructor(public payload: Album) {}
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
  ChangePhotoAlbumFailure;
