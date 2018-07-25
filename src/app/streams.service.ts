import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, of , Subject, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';


@Injectable({
  providedIn: 'root'
})
export class StreamsService {
  
  private socket$: WebSocketSubject<any>;
  candlestick;
  private observer: Observer<any>;

  constructor() { }

  /**
   * 
   * @param symbol - e.g. onteth, ontology and ethereum exchange
   * @param interval - string, 30m for 30 minutes, 1h for 1 hour
   */
  candlestickStream(symbol, interval) {
    let candlestick = `${environment.ws.base}${symbol.toLowerCase()}@kline_${interval}`;
    this.socket$ = new WebSocketSubject(candlestick);
    return this.socket$;
  }

  



}
