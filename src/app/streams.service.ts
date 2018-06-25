import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
@Injectable({
  providedIn: 'root'
})
export class StreamsService {
  symbol = 'trxeth';
  interval  = '30m';

  candlestick = `${environment.baseEndpoint}${this.symbol}@kline_${this.interval}`;
  getStream() {
    return this.ws.create(this.candlestick);
  }

  constructor(private ws: WebSocketSubject<any>) { }

  

}
