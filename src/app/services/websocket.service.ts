import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket;

  constructor() { }

  getMes(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('chat message', (data) => {
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
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    });
  }

  mainConnect(session) {
    this.socket = io(environment.ws_url + 'main',  {
      query: session,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax : 5000,
      reconnectionAttempts: 10
    });
    this.socket.on('connection');
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


}
