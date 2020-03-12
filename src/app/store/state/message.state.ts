import {Msg} from '../../interfaces/msg';

export interface MessageState {
  message: Msg;
  notification: {event: string, mes: Msg};
}

export  const initialMesState: MessageState = {
  message: null,
  notification: null,
};
