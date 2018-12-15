import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';

interface NewsEvent {
    text: string;
}

const WS_URL = 'http://localhost:5000';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;

  constructor() { }

  connect(): Rx.Subject<any> {
    this.socket = io(WS_URL);

    const observable = new Observable((observ) => {
      this.socket.on('news', (data) => {
        console.log('Received news from Websocket Server');
        observ.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    const observer = {
      next: (data: Object) => {
        this.socket.emit('news', JSON.stringify(data));
      },
    };

    return Rx.Subject.create(observer, observable);
  }
}
