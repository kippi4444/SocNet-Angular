import {User} from './user';
import {Album} from './album';

export class Photo {
  _id: string;
  url: string;
  album: string | Album;
  owner: string | User;
  likes?: [];
  created_at?: string;
}
