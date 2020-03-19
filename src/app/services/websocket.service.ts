import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {scrollSettings} from '../interfaces/scroll';
import {Photo} from '../interfaces/photo';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket;
  private mesListener;
  private allMes;
  constructor() { }

  getMes(): Observable<any> {
    return this.mesListener = new Observable(observer => {
      this.socket.on('chat message', (data) => {
        if (this.socket.id !== data.user._id) {
          setTimeout(() => this.socket.emit('read', data.user._id),500);
        }
        observer.next(data);
      });
    });
  }

  sendMes(message) {
    this.socket.emit('chat message', message);
  }

  sendNotification(notification) {
    this.socket.emit('notification', notification);
  }

  notification(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('message', (data) =>{
        observer.next(data);
      });
    });
  }

  getAllMes(dialog: scrollSettings): Observable<any> {
    this.socket.emit('getAllMes', (dialog));
    return this.allMes = new Observable(observer => {
      this.socket.on('allMes', (data) => {
        observer.next(data);
      });
    });
  }

  getScrollMes(dialog: scrollSettings): Observable<any> {
    this.socket.emit('getScrollMes', (dialog));
    return this.allMes = new Observable(observer => {
      this.socket.on('scrollMes', (data) => {
        observer.next(data);
      });
    });
  }

  mainConnect(session) {
    this.socket = io(environment.ws_url,  {
      query: session,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax : 5000,
      reconnectionAttempts: 10
    });
    this.socket.on('connection');
    this.socket.on('connect_error', (error) => error);
  }

  dialogConnect(session) {
    this.socket.emit('goRoom', session);
  }

  mainDisconnect() {
    this.socket.disconnect();
  }

  dialogDisconnect() {
    if (this.socket) {
      this.socket.emit('leftRoom');
    }
  }

  setLikeDislike(PhotoLike) {
    this.socket.emit('addLike', PhotoLike);
  }
}
