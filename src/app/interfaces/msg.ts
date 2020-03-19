import {User} from './user';
import {Dialog} from './dialog';
import {Photo} from './photo';

export class Msg {
  dialog: string | Dialog;
  user: string | User;
  isReading: string[];
  text: string;
  name?: string;
  created_at?: string;
  who?: string;
  photo?: Photo;
}
