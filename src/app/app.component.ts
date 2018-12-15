import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './websocket';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public vehicles = [];
    public eventList = [];
    constructor(private wsService: WebsocketService) {
    }

    ngOnInit() {
        const self = this;
        const updateCars = function (data) {
            const i = self.vehicles.findIndex((item) => item.vehicleId === data.vehicleId);
            (i < 0) ? self.vehicles.push(data) : self.vehicles[i] = data;
        };
        const updateEventList = function (data) { self.eventList.push(data); };

        this.wsService.on('vehicleLocation').pipe( map( updateCars ) ).subscribe();
        this.wsService.on('event').pipe( map( updateEventList ) ).subscribe();

    }

}
