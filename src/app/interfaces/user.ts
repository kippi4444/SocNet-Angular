import {Pet} from './pet';
import {Friend} from './friend';
import {Photo} from './photo';
import {Album} from './album';


export class User {
  _id?: string;
  login?: string;
  name: string;
  online: boolean;
  password: string;
  surname: string;
  number: string;
  email: string;
  birthday: Date;
  avatar: Photo;
  totalCount?: number;
  pets?: Pet[];
  albums?: Album[];
  photos?: Photo[];
  friends?: Friend[];
  requests?: Friend[];
}
