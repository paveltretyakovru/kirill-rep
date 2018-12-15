import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './websocket';
import {map} from 'rxjs/operators';
import { NewsService } from './shared/services/news.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private newsService: NewsService) {
    }

    ngOnInit() {
        this.newsService.news.subscribe((nws) => {
            console.log(nws);
        });
    }

    sendNews(): void {
        this.newsService.sendNws('HELLO MY NEW!');
    }

}
