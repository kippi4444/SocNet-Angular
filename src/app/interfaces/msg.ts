import {User} from './user';
import {Dialog} from './dialog';

export class Msg {
  dialog: string | Dialog;
  user: string | User;
  isReading?: boolean;
  text: string;
  name?: string;
  created_at?: string;
}
