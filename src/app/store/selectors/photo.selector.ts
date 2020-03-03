import {} from '../state/user.state';
import {createSelector} from '@ngrx/store';
import {AppState} from '../state/app.state';
import {UserPhotos} from '../state/photo.state';

const photoUserSelector = (state: AppState) => state.userAlbums;

export const allPhotos = createSelector(
  photoUserSelector,
  (state: UserPhotos) => state.allPhotos
);

export const allAlbums = createSelector(
  photoUserSelector,
  (state: UserPhotos) => state.allAlbums
);

export const selectedAlbum = createSelector(
  photoUserSelector,
  (state: UserPhotos) => state.selectedAlbum
);

export const selectedAlbumPhoto = createSelector(
  photoUserSelector,
  (state: UserPhotos) => state.albumPhotos
);


export const createAlbum = createSelector(
  photoUserSelector,
  (state: UserPhotos) => state.newAlbum
);

export const selectedPhoto = createSelector(
  photoUserSelector,
  (state: UserPhotos) => state.selectedPhoto
);
