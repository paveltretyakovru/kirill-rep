import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  news: Subject<any>;

  constructor(private socketService: SocketService) {
    this.news = <Subject<any>>socketService
      .connect()
      .pipe(map((response: any): any => {
        return response;
      }));
  }

  sendNws(nw) {
      this.news.next(nw);
  }
}
