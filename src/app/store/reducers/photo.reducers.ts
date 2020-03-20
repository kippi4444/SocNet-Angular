import {initialUserPhotos, UserPhotos} from '../state/photo.state';
import {UserPhotosActions} from '../actions/photo.actions';
import {selectedAlbumPhoto} from '../selectors/photo.selector';
import {Photo} from '../../interfaces/photo';

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
        selectedAlbum: action.payload.album,
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
      const photo = JSON.parse(JSON.stringify(action.payload));
      return {
        ...state,
        albumPhotos: state.albumPhotos.concat(action.payload),
        allPhotos: state.allPhotos.concat(photo),
      };
    }
    case UserPhotosActions.ADD_PHOTO_ALBUM_FAILURE: {
      return {
        ...state,
      };
    }

    case UserPhotosActions.ADD_PHOTO_WALL_SUCCESS: {
      const photo = JSON.parse(JSON.stringify(action.payload));
      return {
        ...state,
        albumPhotos: state.albumPhotos.concat(action.payload),
        allPhotos: photo.concat(state.allPhotos),
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
        selectedAlbum: action.payload.album,
        albumPhotos: action.payload.photos,
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
      albumPhotos: state.albumPhotos.filter(photo => photo._id !== action.payload._id),
        allPhotos: state.allPhotos.filter(photo => photo._id !== action.payload._id).concat(action.payload)
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
        albumPhotos: state.albumPhotos.filter(photo => photo._id !== action.payload),
        allPhotos: state.allPhotos.filter(pht => pht._id !== action.payload),
      };
    }

    case UserPhotosActions.LIKE_DISLIKE_SUCCESS: {
      function check(arr: Photo[], payload) {

        return arr.filter(value => {
          if (value._id === payload.mes.photo._id) {
            if (value.likes.includes(payload.mes.who._id)) {
              value.likes = value.likes.filter(id => id !== payload.mes.who._id);
            } else {
              value.likes = value.likes.concat(payload.mes.who._id);
            }
            return value;
          }
          return value;
        });
      }
      return {
        ...state,
        allPhotos: check(state.allPhotos, action.payload),
        albumPhotos: check(state.albumPhotos, action.payload)
      };
    }
    case UserPhotosActions.LIKE_DISLIKE_FAILURE: {
      return {
        ...state,
      };
    }

    case UserPhotosActions.LIKE_EVENT_SUCCESS: {

      function check(arr: Photo[], payload) {
        return arr.filter(value => {

          if (value._id === payload.mes.photo._id) {
            if (value.likes.includes(payload.mes.who._id) && payload.mes.who._id !== payload.mes.photo.owner._id ) {
              value.likes = value.likes.filter(id => id !== payload.mes.who._id);
              return value;
            }
            if (payload.mes.who._id !== payload.mes.photo.owner._id) {
              value.likes.push(payload.mes.who._id);
              return value;
            }
          }
          return value;
        });

      }
      return {
        ...state,
        allPhotos: check(state.allPhotos, action.payload),
        albumPhotos: check(state.albumPhotos, action.payload),
      };
    }
    case UserPhotosActions.LIKE_EVENT_FAILURE: {
      return {
        ...state,
      };
    }

    case UserPhotosActions.ADD_COMMENT_SUCCESS: {
      return {
        ...state,
        allPhotos: state.allPhotos.filter(photo => {
          if (photo._id === action.payload.photo) {
            photo.comments.push(action.payload);
          }
          return photo;
        } ),
        albumPhotos: state.albumPhotos.filter(photo => {
          if (photo._id === action.payload.photo) {
            photo.comments.push(action.payload);
          }
          return photo;
        } ),
      };
    }
    case UserPhotosActions.ADD_COMMENT_FAILURE: {
      return {
        ...state,
      };
    }

    case UserPhotosActions.DEL_COMMENT_SUCCESS: {
      return {
        ...state,
        allPhotos: state.allPhotos.filter(photo => {
          if (photo._id === action.payload.photo) {
            photo.comments = photo.comments.filter(comment => comment._id !== action.payload._id);
          }
          return photo;
        } ),
        albumPhotos: state.albumPhotos.filter(photo => {
          if (photo._id === action.payload.photo) {
            photo.comments = photo.comments.filter(comment => comment._id !== action.payload._id);
          }
          return photo;
        } ),
      };
    }
    case UserPhotosActions.DEL_COMMENT_FAILURE: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};
