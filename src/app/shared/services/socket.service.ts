import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';

const WS_URL = 'http://localhost:5000';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;

  constructor() { }

  connect(): Rx.Subject<MessageEvent> {
    this.socket = io(WS_URL);

    const observable = new Observable((observ) => {
      this.socket.on('message', (data) => {
        console.log('Received message from Websocket Server');
        observ.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    const observer = {
      next: (data: Object) => {
        this.socket.emit('message', JSON.stringify(data));
      },
    };

    return Rx.Subject.create(observer, observable);
  }
}
