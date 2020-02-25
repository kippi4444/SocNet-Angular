

export class User {
  _id?: string;
  login?: string;
  name: string;
  password: string;
  surname: string;
  number: string;
  email: string;
  birthday: Date;
  avatar: object[];
  pets?: object[];
  albums?: object[];
  photos?: object[];
  friends?: object[];
  requests?: object[];
  isFriend?: object[];
  isRequest?: object[];
}
