import {Photo} from '../../interfaces/photo';
import {Album} from '../../interfaces/album';

export interface UserPhotos {
  allPhotos: Photo[];
  allAlbums: Album[];
  selectedAlbum: Album;
  newAlbum: string;
  selectedPhoto: Photo;
  albumPhotos: Photo[];
}

export  const initialUserPhotos: UserPhotos = {
  allPhotos: [],
  allAlbums: [],
  newAlbum: '',
  selectedAlbum: null,
  selectedPhoto: null,
  albumPhotos: [],
};
