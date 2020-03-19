import {User} from './user';
import {Album} from './album';
import {Comments} from './comments';

export class Photo {
  _id: string;
  url: string;
  album: string | Album;
  owner: string | User;
  likes?: string[];
  comments?: Comments[];
  created_at?: string;
}
