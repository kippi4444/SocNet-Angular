import {Pet} from './pet';


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
  avatar: object[];
  pets?: Pet[];
  albums?: object[];
  photos?: object[];
  friends?: object[];
  requests?: object[];
  isFriend?: object[];
  isRequest?: object[];
}
