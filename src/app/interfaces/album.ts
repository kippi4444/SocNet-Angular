import {User} from './user';


export class Album {
  _id?: string;
  title: string;
  description: string;
  photos?: object[];
  owner: string;
  created_at?: string;
}
