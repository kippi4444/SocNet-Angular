import {User} from './user';
import {Photo} from './photo';


export class Album {
  _id?: string;
  title: string;
  description: string;
  photos?: Photo[];
  owner: string | User;
  created_at?: string;
}
