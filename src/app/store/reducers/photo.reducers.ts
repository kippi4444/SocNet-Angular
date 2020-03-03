import {initialUserPhotos, UserPhotos} from '../state/photo.state';
import {UserPhotosActions} from '../actions/photo.actions';

export const userPhotosReducers = (
  state = initialUserPhotos,
  action: UserPhotosActions
): UserPhotos => {
  switch (action.type) {
    case UserPhotosActions.GET_ALL_USER_ALBUMS_SUCCESS: {
      return {
        ...state,
        allAlbums: action.payload,
      };
    }
    case UserPhotosActions.GET_ALL_USER_ALBUMS_FAILURE: {
      return {
        ...state,
        allAlbums: [],
      };
    }

    case UserPhotosActions.GET_SELECTED_ALBUM: {
      return {
        ...state,
        selectedAlbum: null,
        albumPhotos: []
      };
    }
    case UserPhotosActions.GET_SELECTED_ALBUM_SUCCESS: {
      return {
        ...state,
        selectedAlbum: action.payload,
        albumPhotos: action.payload.photos
      };
    }
    case UserPhotosActions.GET_SELECTED_ALBUM_FAILURE: {
      return {
        ...state,
        selectedAlbum: null,
        albumPhotos: []
      };
    }

    case UserPhotosActions.GET_ALL_PHOTOS_SUCCESS: {
      return {
        ...state,
        allPhotos: action.payload,
      };
    }
    case UserPhotosActions.GET_ALL_PHOTOS_FAILURE: {
      return {
        ...state,
        allPhotos: [],
      };
    }

    case UserPhotosActions.GET_SELECTED_PHOTO_SUCCESS: {
      return {
        ...state,
        selectedPhoto: action.payload,
      };
    }
    case UserPhotosActions.GET_SELECTED_PHOTO_FAILURE: {
      return {
        ...state,
        selectedPhoto: null,
      };
    }

    case UserPhotosActions.ADD_PHOTO_ALBUM_SUCCESS: {
      return {
        ...state,
        albumPhotos: state.albumPhotos.concat(action.payload),
        allPhotos: state.allPhotos.concat(action.payload),
      };
    }
    case UserPhotosActions.ADD_PHOTO_ALBUM_FAILURE: {
      return {
        ...state,
      };
    }

    case UserPhotosActions.ADD_PHOTO_WALL_SUCCESS: {
      return {
        ...state,
        albumPhotos: state.albumPhotos.concat(action.payload),
        allPhotos: action.payload.concat(state.allPhotos),
      };
    }
    case UserPhotosActions.ADD_PHOTO_WALL_FAILURE: {
      return {
        ...state,
      };
    }

    case UserPhotosActions.ADD_ALBUM_SUCCESS: {
      return {
        ...state,
        newAlbum: action.payload,
      };
    }
    case UserPhotosActions.ADD_ALBUM_FAILURE: {
      return {
        ...state,
      };
    }

    case UserPhotosActions.DEL_ALBUM_SUCCESS: {
      return {
        ...state,
        allAlbums: state.allAlbums.filter(album => album._id !== action.payload),
      };
    }
    case UserPhotosActions.DEL_ALBUM_FAILURE: {
      return {
        ...state,
      };
    }

    case UserPhotosActions.UPDATED_ALBUM_SUCCESS: {
      return {
        ...state,
        selectedAlbum: action.payload,
      };
    }
    case UserPhotosActions.UPDATED_ALBUM_FAILURE: {
      return {
        ...state,
      };
    }


    case UserPhotosActions.CHANGE_PHOTO_ALBUM_SUCCESS: {
      return {
        ...state,
        selectedAlbum: {...state.selectedAlbum,
          photos: state.albumPhotos.filter(photo => photo._id !== action.payload._id)},
      albumPhotos: state.albumPhotos.filter(photo => photo._id !== action.payload._id)
      };
    }
    case UserPhotosActions.CHANGE_PHOTO_ALBUM_FAILURE: {
      return {
        ...state,
      };
    }

    case UserPhotosActions.DEL_PHOTO_SUCCESS: {
      return {
        ...state,
        allPhotos: state.allPhotos.filter(pht => pht._id !== action.payload),
      };
    }
    case UserPhotosActions.DEL_PHOTO_FAILURE: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};
