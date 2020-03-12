
import {createSelector} from '@ngrx/store';
import {AppState} from '../state/app.state';
import {MessageState} from '../state/message.state';


const messageNotification = (state: AppState) => state.message;

export const getMessage = createSelector(
  messageNotification,
  (state: MessageState) => state.message
);

export const getNotification = createSelector(
  messageNotification,
  (state: MessageState) => state.notification
);
