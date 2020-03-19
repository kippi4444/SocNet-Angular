import {User} from './user';
import {Msg} from './msg';

export class Dialog {
  _id?: string;
  title: string;
  person: string[];
  persons?: User | User[];
  mes?: Msg[];
}
