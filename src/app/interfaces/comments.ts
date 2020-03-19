import {Photo} from './photo';
import {User} from './user';

export class Comments {
  _id?: string;
  text: string;
  photo: string | Photo;
  user: string | User;
  created_at?: string;
}
