import { Observable } from 'rxjs';

export interface IWebsocketService {
    status: Observable<boolean>;
    on<T>(event: string): Observable<any>;
    send(event: string, data: any): void;
}

export interface WebSocketConfig {
    url: string;
    reconnectInterval?: number;
    reconnectAttempts?: number;
}

export interface WsMessage<T> {
    [key: string]: object;
}
