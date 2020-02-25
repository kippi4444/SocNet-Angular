import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as Rx from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket;
  private generalSocket;

  constructor() { }

  connect(session): Rx.Subject<MessageEvent>{
    this.socket = io(environment.ws_url + session.nameSpace);
    this.socket.on('connection');

    const observable = new Observable(observer => {
      this.socket.on('chat message', (data) => {

        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
  });
    const observer = {
      next: (data: object) => {
        this.socket.emit('chat message', data);
      }
    };

    return Rx.Subject.create(observer, observable);
  }

  generalConnect(session): Rx.Subject<MessageEvent>{
    this.generalSocket = io(environment.ws_url);
    this.generalSocket.on('connection');
    this.generalSocket.emit('addSession', session);


    const observable = new Observable(observer => {
      this.generalSocket.on('message', (data) => {

        observer.next(data);
      });
      return () => {
        this.generalSocket.disconnect();
      };
    });
    const observer = {
      next: (data: object) => {
        this.generalSocket.emit('message', data);
      }
    };

    return Rx.Subject.create(observer, observable);
  }
}
